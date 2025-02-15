import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function payTicket(req: Request, res: Response, next: NextFunction) {
  try {
    console.log("HIT");
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { eventId, redeem, useCoupon, ticketQty = 1 } = req.body;
    const quantity = Number(ticketQty) > 0 ? Number(ticketQty) : 1;

    if (!eventId || typeof eventId !== "number") {
      return res.status(400).json({ message: "eventId is required (number)" });
    }

    // 1) Ambil event => dapat base price
    const event = await prisma.event.findUnique({ where: { id: eventId } });
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // === CHECK: APABILA EVENT GRATIS ===
    if (event.isFree || event.price === 0) {
      // Buat registration tanpa transaction
      const registration = await prisma.registration.create({
        data: {
          eventId: event.id,
          userId,
        },
      });

      // Tanggapi ke client bahwa event gratis => no transaction needed
      return res.status(201).json({
        message: "Registration successful (FREE EVENT). No transaction created.",
        registration,
      });
    }
    // === EVENT BERBAYAR (LANJUTKAN PROSES PEMBAYARAN) ===

    let ticketPrice = event.price * quantity;
    console.log(event);
    console.log("1 => ticketPrice:", ticketPrice);

    // 2) Cek user => wallet
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 3) Gunakan coupon (jika useCoupon = true)
    let couponDiscount = 0;
    let usedCouponId: number | null = null;

    if (useCoupon) {
      const coupon = await prisma.coupon.findFirst({
        where: { userId, expiresAt: { gte: new Date() } },
      });
      if (coupon) {
        couponDiscount = Math.floor((ticketPrice * coupon.discount) / 100);
        ticketPrice = Math.max(ticketPrice - couponDiscount, 0);
        console.log("2 => ticketPrice after coupon:", ticketPrice);

        // Tandai coupon sebagai sudah terpakai (hapus record atau update 'used' field)
        usedCouponId = coupon.id;
      }
    }

    // 4) Redeem points (jika redeem = true)
    let totalPointsUsed = 0;
    if (redeem) {
      const userPoints = await prisma.point.findMany({
        where: { userId, expiresAt: { gte: new Date() } },
        orderBy: { expiresAt: "asc" },
      });
      const sumPoints = userPoints.reduce((acc, p) => acc + p.pointsEarned, 0);
      console.log("User total points =>", sumPoints);

      if (sumPoints > 0) {
        if (sumPoints >= ticketPrice) {
          totalPointsUsed = ticketPrice;
          ticketPrice = 0;
        } else {
          totalPointsUsed = sumPoints;
          ticketPrice -= sumPoints;
        }
        console.log("3 => ticketPrice after points:", ticketPrice);

        // Deduct points record by record
        let remaining = totalPointsUsed;
        for (const p of userPoints) {
          if (remaining <= 0) break;
          if (p.pointsEarned > remaining) {
            await prisma.point.update({
              where: { id: p.id },
              data: { pointsEarned: p.pointsEarned - remaining },
            });
            remaining = 0;
          } else {
            await prisma.point.delete({ where: { id: p.id } });
            remaining -= p.pointsEarned;
          }
        }
      }
    }

    // 5) Potong wallet (jika masih ada yang harus dibayar)
    let walletUsed = 0;
    console.log("final ticketPrice sebelum wallet:", ticketPrice);

    if (ticketPrice > 0) {
      if (user.walletBalance < ticketPrice) {
        return res.status(400).json({
          message: "Insufficient wallet balance",
          needed: ticketPrice,
          walletBalance: user.walletBalance,
        });

      }
      console.log("HELLO" + user?.walletBalance)

      await prisma.user.update({
        where: { id: userId },
        data: { walletBalance: { decrement: ticketPrice } },
      });
      walletUsed = ticketPrice;
      ticketPrice = 0;
    }

    // 6) Buat Registration
    const registration = await prisma.registration.create({
      data: {
        eventId: event.id,
        userId,
      },
    });

    // 7) Buat Transaction
    const originalPrice = event.price * quantity;
    const finalTransactionAmount = Math.max(
      originalPrice - couponDiscount - totalPointsUsed,
      0
    );

    await prisma.transaction.create({
      data: {
        amount: finalTransactionAmount,
        eventId: event.id,
        registrationId: registration.id,
      },
    });

    // Hapus coupon jika dipakai
    if (usedCouponId) {
      await prisma.coupon.delete({ where: { id: usedCouponId } });
      console.log("=> coupon with id=", usedCouponId, " has been deleted (used).");
    }

    // 8) Response
    res.status(200).json({
      message: "Payment successful!",
      originalTicketPrice: originalPrice,
      couponDiscount,
      totalPointsUsed,
      walletUsed,
      finalPricePaid: finalTransactionAmount,
      newWalletBalance: user.walletBalance - walletUsed,
      registrationId: registration.id,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Jika user butuh top-up:
 */
export async function topUpWallet(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { amount } = req.body;
    if (!amount || typeof amount !== "number" || amount <= 0) {
      return res.status(400).json({ message: "Invalid top-up amount" });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        walletBalance: { increment: amount },
      },
    });

    res.status(200).json({
      message: "Top-up successful",
      newWalletBalance: updatedUser.walletBalance,
    });
  } catch (error) {
    next(error);
  }
}