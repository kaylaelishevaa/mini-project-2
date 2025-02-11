import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function redeemPoints(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // 1) userId from req.user.id (set by authMiddleware)
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    // 2) Only need ticketPrice from body
    const { ticketPrice } = req.body;
    if (!ticketPrice || typeof ticketPrice !== "number") {
      res
        .status(400)
        .json({ message: "ticketPrice is required and must be a number" });
      return;
    }

    // 3) Find all active points for this user
    const userPoints = await prisma.point.findMany({
      where: {
        userId: userId,
        expiresAt: { gte: new Date() },
      },
    });

    // Sum points
    const totalPoints = userPoints.reduce((sum, p) => sum + p.pointsEarned, 0);
    if (totalPoints === 0) {
      res.status(400).json({ message: "No points available for redemption." });
      return;
    }

    // 4) Subtract from the ticketPrice
    let newTicketPrice = ticketPrice;
    if (totalPoints >= ticketPrice) {
      newTicketPrice = 0;
    } else {
      newTicketPrice = ticketPrice - totalPoints;
    }

    // 5) Deduct or delete point records
    for (const point of userPoints) {
      if (newTicketPrice === 0) break;

      if (point.pointsEarned >= newTicketPrice) {
        await prisma.point.update({
          where: { id: point.id },
          data: {
            pointsEarned: point.pointsEarned - newTicketPrice,
          },
        });
        newTicketPrice = 0;
      } else {
        await prisma.point.delete({ where: { id: point.id } });
        newTicketPrice -= point.pointsEarned;
      }
    }

    // 6) Return success
    res.status(200).json({
      message: "Points redeemed successfully!",
      finalPrice: newTicketPrice,
    });
  } catch (error) {
    next(error);
  }
}

export async function checkoutTicket(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { username, ticketPrice } = req.body;

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      res.status(404).json({ message: "User not found!" });
      return;
    }

    const points = await prisma.point.findMany({
      where: { userId: user.id, expiresAt: { gte: new Date() } },
    });

    const coupons = await prisma.coupon.findFirst({
      where: { userId: user.id, expiresAt: { gte: new Date() } },
    });

    let totalDiscount = 0;

    if (!coupons) {
      console.log("No valid coupons available.");
    }

    const totalPoints = points.reduce(
      (sum, point) => sum + point.pointsEarned,
      0
    );
    if (totalPoints > 0) {
      totalDiscount += Math.min(totalPoints, ticketPrice);
    }

    if (coupons) {
      totalDiscount += (ticketPrice * coupons.discount) / 100;
    }

    const finalPrice = Math.max(0, ticketPrice - totalDiscount);

    res.status(200).json({
      originalPrice: ticketPrice,
      discount: totalDiscount,
      finalPrice: finalPrice,
    });
  } catch (error) {
    next(error);
  }
}

export async function getPoints(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized!" });
    }

    const pointsRecords = await prisma.point.findMany({
      where: { userId, expiresAt: { gte: new Date() } },
      orderBy: { expiresAt: "asc" },
    });

    const totalPoints = pointsRecords.reduce(
      (sum, p) => sum + p.pointsEarned,
      0
    );

    let earliestExpiry = null;

    if (pointsRecords.length > 0) {
      earliestExpiry = pointsRecords[0].expiresAt;
    }

    res.status(200).json({
      points: totalPoints,
      expiresAt: earliestExpiry ? earliestExpiry.toISOString() : null,
    });
  } catch (error) {
    next(error);
  }
}

export async function getActiveCoupon(
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

    const coupon = await prisma.coupon.findFirst({
      where: {
        userId,
        expiresAt: { gte: new Date() },
      },
      orderBy: {
        expiresAt: "asc",
      },
    });

    if (!coupon) {
      res.status(404).json({ message: "No active coupon found." });
      return;
    }

    res.status(200).json({
      ok: true,
      discount: coupon.discount,
      expiresAt: coupon.expiresAt.toISOString(),
    });
  } catch (error) {
    next(error);
  }
}
