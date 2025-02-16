import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { logger } from "../middleware/error-middleware";

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

export async function CreateVouchers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const organizerId = req.user?.id;

    if (!organizerId) {
      res.status(401).json({ message: "Unauthorized! Please login." });
      return;
    }

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

    const VoucherData = {
      eventId: +eventId,
      discountRate: parseInt(discountValue, 10),
      stock: Number(limit),
      code: referralCode,
      expiredAt: new Date(validUntil),
    };

    const Voucher = await prisma.voucher.create({
      data: VoucherData,
    });

    res
      .status(201)
      .json({ ok: true, message: "New Voucher added", data: Voucher });
  } catch (error: unknown) {
    if (error instanceof Error) {
      const errorMessage = `Unexpected error in CreateVoucher: ${error.message}`;
      logger(errorMessage);
      next(error);
    } else {
      const errorMessage = `Unknown error occurred in CreateVoucher`;
      logger(errorMessage);
      next(error);
    }
  }
}

export async function GetSingleVouchers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const Voucher = await prisma.voucher.findUnique({
      where: { id: +req.params.id },
      include: { event: true },
    });

    if (!Voucher) {
      const errorMessage = `Voucher with ID ${req.params.id} not found`;
      logger(errorMessage);
      res.status(404).json({ message: errorMessage });
      return;
    }

    res.status(200).json({ ok: true, data: Voucher });
  } catch (error: unknown) {
    if (error instanceof Error) {
      const errorMessage = `Unexpected error in GetSingleVoucher: ${error.message}`;
      logger(errorMessage);
      next(error);
    } else {
      const errorMessage = `Unknown error occurred in GetSingleVoucher`;
      logger(errorMessage);
      next(error);
    }
  }
}

export async function GetAllVouchers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const Vouchers = await prisma.voucher.findMany({
      include: { event: true },
    });

    res.status(200).json({ ok: true, data: Vouchers });
  } catch (error: unknown) {
    if (error instanceof Error) {
      const errorMessage = `Unexpected error in GetAllVouchers: ${error.message}`;
      logger(errorMessage);
      next(error);
    } else {
      const errorMessage = `Unknown error occurred in GetAllVouchers`;
      logger(errorMessage);
      next(error);
    }
  }
}
