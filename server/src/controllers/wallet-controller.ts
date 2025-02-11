// controllers/wallet-controller.ts (atau payment-controller.ts)
import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * payTicket
 * Body JSON:
 * {
 *   "ticketPrice": number,
 *   "redeem": boolean,      // apakah user mau pakai points
 *   "useCoupon": boolean    // apakah user mau pakai coupon
 * }
 */
export async function payTicket(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    // [CHANGE] Sekarang kita pakai eventId (BUKAN lagi ticketPrice) sebagai input
    const { eventId, redeem, useCoupon } = req.body;
    if (!eventId || typeof eventId !== "number") {
      res.status(400).json({ message: "eventId is required" });
      return;
    }

    // 1) Ambil event => dapat price
    const event = await prisma.event.findUnique({ where: { id: eventId } });
    if (!event) {
      res.status(404).json({ message: "Event not found" });
      return;
    }

    // Kalo event.isFree -> price=0
    let ticketPrice = event.isFree ? 0 : event.price;

    // 2) Ambil user => cek wallet
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return
    }

    // 3) Gunakan coupon (useCoupon)
    let couponDiscount = 0;
    if (useCoupon) {
      const coupon = await prisma.coupon.findFirst({
        where: {
          userId,
          expiresAt: { gte: new Date() },
        },
      });
      if (coupon) {
        couponDiscount = Math.floor((ticketPrice * coupon.discount) / 100);
        ticketPrice = Math.max(ticketPrice - couponDiscount, 0);
      }
    }

    // 4) Redeem points (redeem = true)
    let totalPointsUsed = 0;
    if (redeem) {
      // Ambil seluruh points user yang belum kedaluwarsa
      const userPoints = await prisma.point.findMany({
        where: {
          userId,
          expiresAt: { gte: new Date() },
        },
        orderBy: { expiresAt: "asc" },
      });
      const sumPoints = userPoints.reduce((sum, p) => sum + p.pointsEarned, 0);
      if (sumPoints > 0) {
        if (sumPoints >= ticketPrice) {
          totalPointsUsed = ticketPrice;
          ticketPrice = 0;
        } else {
          totalPointsUsed = sumPoints;
          ticketPrice -= sumPoints;
        }

        // Deduct points record-by-record
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

    // 5) Kalau masih ada sisa ticketPrice > 0 => potong wallet
    let walletUsed = 0;
    if (ticketPrice > 0) {
      if (user.walletBalance < ticketPrice) {
        res.status(400).json({
          message: "Insufficient wallet balance",
          needed: ticketPrice,
          walletBalance: user.walletBalance,
        });
        return
      }
      await prisma.user.update({
        where: { id: userId },
        data: {
          walletBalance: { decrement: ticketPrice },
        },
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

    // 7) Buat record Transaction
    //    amount = (price asli - potongan coupon - potongan points)
    const originalPrice = event.isFree ? 0 : event.price;
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

    // 8) Return response
    res.status(200).json({
      message: "Payment successful!",
      originalTicketPrice: event.price,
      couponDiscount,
      totalPointsUsed,
      walletUsed,
      finalPricePaid: event.price, // catatan "harga normal"
      leftoverToPay: ticketPrice, // musti 0 kalo lunas
      newWalletBalance: user.walletBalance - walletUsed,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Contoh topUpWallet - jika kamu butuh user top-up saldo
 */
export async function topUpWallet(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const { amount } = req.body;
    if (!amount || typeof amount !== "number" || amount <= 0) {
      res.status(400).json({ message: "Invalid top-up amount" });
      return;
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        walletBalance: {
          increment: amount,
        },
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
