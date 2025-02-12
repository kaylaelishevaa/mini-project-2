import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { logger } from "../middleware/error-middleware";

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

export async function CreatePromotions(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // const organizerId = req.user?.id;

    // if (!organizerId) {
    //   res.status(401).json({ message: "Unauthorized! Please login." });
    //   return;
    // }

    const { eventId, name, discountValue, limit, referralCode, validUntil } =
      req.body;

    const missingFields = [];
    if (!eventId) missingFields.push("eventId");
    if (!name) missingFields.push("name");
    if (!discountValue) missingFields.push("discountValue");
    if (!limit) missingFields.push("limit");
    if (!validUntil) missingFields.push("validUntil");

    if (missingFields.length > 0) {
      const errorMessage = `Missing required fields: ${missingFields.join(
        ", "
      )}`;
      logger(errorMessage);
      res.status(400).json({ ok: false, message: errorMessage });
      return;
    }

    const event = await prisma.event.findUnique({
      where: { id: +eventId },
    });

    if (!event) {
      const errorMessage = `Event with ID ${eventId} not found`;
      logger(errorMessage);
      res.status(404).json({ message: errorMessage });
      return;
    }

    const promotionData = {
      eventId: +eventId,
      name,
      discountValue: parseInt(discountValue, 10),
      limit: parseInt(limit, 10),
      referralCode,
      validUntil: new Date(validUntil),
    };

    const promotion = await prisma.promotion.create({
      data: promotionData,
    });

    res
      .status(201)
      .json({ ok: true, message: "New Promotion added", data: promotion });
  } catch (error: unknown) {
    if (error instanceof Error) {
      const errorMessage = `Unexpected error in CreatePromotion: ${error.message}`;
      logger(errorMessage);
      next(error);
    } else {
      const errorMessage = `Unknown error occurred in CreatePromotion`;
      logger(errorMessage);
      next(error);
    }
  }
}

export async function GetSinglePromotions(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const promotion = await prisma.promotion.findUnique({
      where: { id: +req.params.id },
      include: { event: true },
    });

    if (!promotion) {
      const errorMessage = `Promotion with ID ${req.params.id} not found`;
      logger(errorMessage);
      res.status(404).json({ message: errorMessage });
      return;
    }

    res.status(200).json({ ok: true, data: promotion });
  } catch (error: unknown) {
    if (error instanceof Error) {
      const errorMessage = `Unexpected error in GetSinglePromotion: ${error.message}`;
      logger(errorMessage);
      next(error);
    } else {
      const errorMessage = `Unknown error occurred in GetSinglePromotion`;
      logger(errorMessage);
      next(error);
    }
  }
}

export async function GetAllPromotions(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const promotions = await prisma.promotion.findMany({
      include: { event: true },
    });

    res.status(200).json({ ok: true, data: promotions });
  } catch (error: unknown) {
    if (error instanceof Error) {
      const errorMessage = `Unexpected error in GetAllPromotions: ${error.message}`;
      logger(errorMessage);
      next(error);
    } else {
      const errorMessage = `Unknown error occurred in GetAllPromotions`;
      logger(errorMessage);
      next(error);
    }
  }
}
