import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import fs from "fs/promises";
import { PrismaClient } from "@prisma/client";
import cloudinary from "../configs/cloudinary";
import { logger } from "../middleware/error-middleware";
import { EventData } from "../types/express";

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-") // Replace spaces and non-word characters with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading and trailing hyphens
}

export async function CreateEvent(
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
    const {
      name,
      excerpt,
      description,
      date,
      price,
      location,
      availableSeats,
      categoryIds,
      isFree,
    } = req.body;

    const missingFields = [];
    if (!name) missingFields.push("name");
    if (!excerpt) missingFields.push("excerpt");
    if (!description) missingFields.push("description");
    if (!location) missingFields.push("location");
    if (!date) missingFields.push("date");
    if (!price) missingFields.push("price");
    if (!availableSeats) missingFields.push("availableSeats");
    if (!categoryIds || categoryIds.length <= 0)
      missingFields.push("categoryIds");
    if (isFree === undefined) missingFields.push("isFree");
    if (!req.file) missingFields.push("image");

    if (missingFields.length > 0) {
      const errorMessage = `Missing required fields: ${missingFields.join(
        ", "
      )}`;
      logger(errorMessage);
      res.status(400).json({ ok: false, message: errorMessage });
      return;
    }

    if (req.file) {
      const cloudinaryData = await cloudinary.uploader.upload(req.file.path, {
        folder: "event/images",
      });

      await fs.unlink(req.file.path);

      const slug = generateSlug(name);

      const eventData: EventData = {
        name,
        excerpt,
        description,
        date: new Date(date),
        location,
        image: cloudinaryData.secure_url,
        price: Number(price),
        availableSeats: parseInt(availableSeats, 10),
        slug,
        organizerId,
        isFree: isFree === "false" ? false : true,
        CategoryEvent: {
          createMany: {
            data: categoryIds.map((category: number) => ({
              categoryId: +category,
            })),
          },
        },
      };

      await prisma.event.create({
        data: eventData,
      });

      res.status(201).json({ ok: true, message: "New Event added" });
    } else {
      res.status(400).json({ message: "Image file is required" });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      const errorMessage = `Unexpected error in CreateEvent: ${error.message}`;
      logger(errorMessage);
      next(error);
    } else {
      const errorMessage = `Unknown error occurred in CreateEvent`;
      logger(errorMessage);
      next(error);
    }
  }
}

export async function GetAllEvents(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const events = await prisma.event.findMany({
      include: {
        CategoryEvent: { include: { Category: true } },
        Attendee: true,
      },
    });

    const response = events.map((event) => ({
      id: event.id,
      name: event.name,
      excerpt: event.excerpt,
      description: event.description,
      date: event.date,
      price: event.price,
      image: event.image,
      location: event.location,
      availableSeats: event.availableSeats,
      organizerId: event.organizerId,
      isFree: event.isFree,
      slug: event.slug,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt,
      categories: event.CategoryEvent.map((category) => category.Category.name),
      attendees: event.Attendee.map((attendee) => ({
        id: attendee.id,
        name: attendee.name,
        email: attendee.email,
        hasPaid: attendee.hasPaid,
        referralCode: attendee.referralCode,
      })),
    }));

    res.status(200).json({ ok: true, data: response, cache: false });
  } catch (error: unknown) {
    if (error instanceof Error) {
      const errorMessage = `Unexpected error in GetAllEvents: ${error.message}`;
      logger(errorMessage);
      next(error);
    } else {
      const errorMessage = `Unknown error occurred in GetAllEvents`;
      logger(errorMessage);
      next(error);
    }
  }
}

export async function GetSingleEvent(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const event = await prisma.event.findUnique({
      where: { id: +req.params.id },
      include: {
        organizer: true,
        CategoryEvent: { include: { Category: true } },
      },
    });

    if (!event) {
      const errorMessage = `Event with ID ${req.params.id} not found`;
      logger(errorMessage);
      res.status(404).json({ message: errorMessage });
      return;
    }

    const response = {
      id: event.id,
      name: event.name,
      excerpt: event.excerpt,
      description: event.description,
      date: event.date,
      price: event.price,
      image: event.image,
      location: event.location,
      availableSeats: event.availableSeats,
      organizerId: event.organizerId,
      isFree: event.isFree,
      slug: event.slug,
      organizer: {
        id: event.organizer.id,
        name: event.organizer.name,
        email: event.organizer.email,
        // Include other organizer fields as necessary
      },
      categories: event.CategoryEvent.map((category) => category.Category.name),
      // registrations: event.registrations.map((registration) => ({
      //   id: registration.id,
      //   // Include other registration fields as necessary
      // })),
      // transactions: event.transactions.map((transaction) => ({
      //   id: transaction.id,
      //   // Include other transaction fields as necessary
      // })),
      // attendees: event.Attendee.map((attendee) => ({
      //   id: attendee.id,
      //   name: attendee.name,
      //   email: attendee.email,
      //   hasPaid: attendee.hasPaid,
      //   referralCode: attendee.referralCode,
      // })),
      // promotions: event.promotions.map((promotion) => ({
      //   id: promotion.id,
      //   name: promotion.name,
      //   discountValue: promotion.discountValue,
      //   limit: promotion.limit,
      //   referralCode: promotion.referralCode,
      //   validUntil: promotion.validUntil,
      // })),
      createdAt: event.createdAt,
      updatedAt: event.updatedAt,
    };

    res.status(200).json({
      ok: true,
      data: {
        ...event,
        categories: event.CategoryEvent.map(
          (category) => category.Category.name
        ),
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      const errorMessage = `Unexpected error in GetSingleEvent: ${error.message}`;
      logger(errorMessage);
      next(error);
    } else {
      const errorMessage = `Unknown error occurred in GetSingleEvent`;
      logger(errorMessage);
      next(error);
    }
  }
}

export async function GetEventByCurrentCustomerId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const events = await prisma.event.findMany({
    where: { Attendee: { some: { email: req?.user?.email } } },
  });

  res.status(200).json({ ok: true, data: events });
}

export async function GetEventByCurrentOrganizerId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const events = await prisma.event.findMany({
    where: {
      organizerId: req?.user?.id,
    },
  });

  res.status(200).json({ ok: true, data: events });
}
