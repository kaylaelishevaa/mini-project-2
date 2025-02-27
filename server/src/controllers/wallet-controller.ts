import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { exitCode } from "node:process";

const prisma = new PrismaClient();

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

    const { eventId, redeem, useCoupon, useVoucher, ticketQty = 1 } = req.body;
    const quantity = Number(ticketQty) > 0 ? Number(ticketQty) : 1;

    if (!eventId || typeof eventId !== "number") {
      res.status(400).json({ message: "eventId is required (number)" });
      return;
    }

    // 1) Ambil event => dapat base price
    const event = await prisma.event.findUnique({ where: { id: eventId } });
    if (!event) {
      res.status(404).json({ message: "Event not found" });
      return;
    }

    // === CHECK: APABILA EVENT GRATIS ===
    if (event.isFree || Number(event.price) === 0) {
      // Buat registration tanpa transaction
      const registration = await prisma.registration.create({
        data: {
          eventId: event.id,
          userId,
        },
      });

      // Tanggapi ke client bahwa event gratis => no transaction needed
      res.status(201).json({
        message:
          "Registration successful (FREE EVENT). No transaction created.",
        registration,
      });
    }
    // === EVENT BERBAYAR (LANJUTKAN PROSES PEMBAYARAN) ===

    let ticketPrice = Number(event.price) * quantity;
    console.log(event);
    console.log("1 => ticketPrice:", ticketPrice);

    // 2) Cek user => wallet
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
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

    // 5) Gunakan voucher (jika useVoucher = true)
    let voucherDiscount = 0;
    let usedVoucherId: number | null = null;

    if (useVoucher) {
      const voucherCode = req.body.voucherCode; // Assuming voucher code is passed in the request body
      if (!voucherCode) {
        res.status(400).json({ message: "Voucher code is required" });
        return;
      }

      const voucher = await prisma.voucher.findFirst({
        where: {
          code: voucherCode,
          eventId: eventId,
          expiredAt: { gte: new Date() },
          stock: { gt: 0 },
        },
      });

      if (!voucher) {
        res.status(400).json({ message: "Invalid or expired voucher" });
        return;
      }

      voucherDiscount = Math.floor((ticketPrice * voucher.discountRate) / 100);
      ticketPrice = Math.max(ticketPrice - voucherDiscount, 0);

      usedVoucherId = voucher.id;

      // Decrease voucher stock
      await prisma.voucher.update({
        where: { id: voucher.id },
        data: { stock: { decrement: 1 } },
      });
    }

    // 6) Potong wallet
    let walletUsed = 0;

    if (ticketPrice > 0) {
      if (user.walletBalance < ticketPrice) {
        res.status(400).json({
          message: "Insufficient wallet balance",
          needed: ticketPrice,
          walletBalance: user.walletBalance,
        });
        return;
      }
      console.log("HELLO" + user?.walletBalance);

      await prisma.user.update({
        where: { id: userId },
        data: { walletBalance: { decrement: ticketPrice } },
      });
      walletUsed = ticketPrice;
      ticketPrice = 0;
    }

    // 7) Buat Registration
    const registration = await prisma.registration.create({
      data: {
        eventId: event.id,
        userId,
      },
    });

    // 8) Buat Transaction
    const originalPrice = event.isFree ? 0 : Number(event.price) * quantity;
    const finalTransactionAmount = Math.max(
      originalPrice - couponDiscount - totalPointsUsed - voucherDiscount,
      0
    );

    await prisma.transaction.create({
      data: {
        amount: finalTransactionAmount,
        eventId: event.id,
        userId: userId,
        registrationId: registration.id,
      },
    });

    // Hapus coupon jika dipakai
    if (usedCouponId) {
      await prisma.coupon.delete({ where: { id: usedCouponId } });
    }

    // 9) pengurangan kapasitas event jika sudah dibeli oleh customer
    await prisma.event.update({
      where: { id: eventId },
      data: { availableSeats: { decrement: ticketQty } },
    });

    // 10 penambaan attende
    await prisma.attendee.create({
      data: {
        eventId: eventId,
        name: req.user.name,
        email: req.user.email,
        hasPaid: true,
      },
    });

    // 8) Response
    res.status(200).json({
      message: "Payment successful!",
      originalTicketPrice: originalPrice,
      couponDiscount,
      totalPointsUsed,
      voucherDiscount,
      walletUsed,
      finalPricePaid: finalTransactionAmount,
      leftoverToPay: ticketPrice,
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

// BACKUP CODEEE

// export async function payTicket(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   try {
//     const userId = req.user?.id;
//     if (!userId) {
//       res.status(401).json({ message: "Unauthorized" });
//       return;
//     }

//     const { eventId, redeem, useCoupon, ticketQty = 1 } = req.body;
//     const quantity = Number(ticketQty) > 0 ? Number(ticketQty) : 1;

//     if (!eventId || typeof eventId !== "number") {
//       res.status(400).json({ message: "eventId is required (number)" });
//       return;
//     }

//     // 1) Ambil event => dapat base price
//     const event = await prisma.event.findUnique({ where: { id: eventId } });
//     if (!event) {
//       res.status(404).json({ message: "Event not found" });
//       return;
//     }

//     let ticketPrice = event.isFree ? 0 : event.price * quantity;

//     // 2) Cek user => wallet
//     const user = await prisma.user.findUnique({ where: { id: userId } });
//     if (!user) {
//       res.status(404).json({ message: "User not found" });
//       return;
//     }

//     // 3) Gunakan coupon (jika useCoupon = true)
//     let couponDiscount = 0;
//     let usedCouponId: number | null = null; // [HIGHLIGHT NEW]

//     if (useCoupon) {
//       const coupon = await prisma.coupon.findFirst({
//         where: { userId, expiresAt: { gte: new Date() } },
//       });
//       if (coupon) {
//         couponDiscount = Math.floor((ticketPrice * coupon.discount) / 100);
//         ticketPrice = Math.max(ticketPrice - couponDiscount, 0);

//         /**
//          * [HIGHLIGHT CHANGE]
//          * Setelah coupon dipakai, kita tandai agar “tidak aktif” lagi
//          * di sini saya hapus record. Alternatif: update field "used=true", dsb.
//          */
//         usedCouponId = coupon.id; // simpan ID agar dihapus di bawah
//       }
//     }

//     // 4) Redeem points (jika redeem = true)
//     let totalPointsUsed = 0;
//     if (redeem) {
//       const userPoints = await prisma.point.findMany({
//         where: { userId, expiresAt: { gte: new Date() } },
//         orderBy: { expiresAt: "asc" },
//       });
//       const sumPoints = userPoints.reduce((acc, p) => acc + p.pointsEarned, 0);

//       if (sumPoints > 0) {
//         if (sumPoints >= ticketPrice) {
//           totalPointsUsed = ticketPrice;
//           ticketPrice = 0;
//         } else {
//           totalPointsUsed = sumPoints;
//           ticketPrice -= sumPoints;
//         }

//         // Deduct points record by record
//         let remaining = totalPointsUsed;
//         for (const p of userPoints) {
//           if (remaining <= 0) break;
//           if (p.pointsEarned > remaining) {
//             await prisma.point.update({
//               where: { id: p.id },
//               data: { pointsEarned: p.pointsEarned - remaining },
//             });
//             remaining = 0;
//           } else {
//             await prisma.point.delete({ where: { id: p.id } });
//             remaining -= p.pointsEarned;
//           }
//         }
//       }
//     }

//     // 5) Potong wallet
//     let walletUsed = 0;

//     if (ticketPrice > 0) {
//       if (user.walletBalance < ticketPrice) {
//         res.status(400).json({
//           message: "Insufficient wallet balance",
//           needed: ticketPrice,
//           walletBalance: user.walletBalance,
//         });
//         return;
//       }

//       await prisma.user.update({
//         where: { id: userId },
//         data: { walletBalance: { decrement: ticketPrice } },
//       });
//       walletUsed = ticketPrice;
//       ticketPrice = 0;
//     }

//     // 6) Buat Registration
//     const registration = await prisma.registration.create({
//       data: {
//         eventId: event.id,
//         userId,
//       },
//     });

//     // 7) Buat Transaction
//     const originalPrice = event.isFree ? 0 : event.price * quantity;
//     const finalTransactionAmount = Math.max(
//       originalPrice - couponDiscount - totalPointsUsed,
//       0
//     );

//     await prisma.transaction.create({
//       data: {
//         amount: finalTransactionAmount,
//         eventId: event.id,
//         userId: userId,
//         registrationId: registration.id,
//       },
//     });

//     if (usedCouponId) {
//       await prisma.coupon.delete({ where: { id: usedCouponId } });
//     }

//     // 8) pengurangan kapasitas event jika sudah dibeli oleh customer
//     await prisma.event.update({
//       where: { id: eventId },
//       data: { availableSeats: { decrement: ticketQty } },
//     });

//     // 9 penambaan attende

//     await prisma.attendee.create({
//       data: {
//         eventId: eventId,
//         name: req.user.name,
//         email: req.user.email,
//         hasPaid: true,
//       },
//     });

//     res.status(200).json({
//       message: "Payment successful!",
//       originalTicketPrice: originalPrice,
//       couponDiscount,
//       totalPointsUsed,
//       walletUsed,
//       finalPricePaid: originalPrice,
//       leftoverToPay: ticketPrice,
//       newWalletBalance: user.walletBalance - walletUsed,
//       quantity,
//     });
//   } catch (error) {
//     next(error);
//   }
// }
