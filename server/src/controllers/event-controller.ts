import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import fs from "fs/promises";
import { PrismaClient } from "@prisma/client";
import cloudinary from "../configs/cloudinary";
import { logger } from "../middleware/error-middleware";
import { EventData } from "../types/express";
import multer from "multer";

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

export async function CreateEvent(
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

    const {
      name,
      excerpt,
      description,
      location,
      date,
      price,
      availableSeats,
      categoryIds,
      isFree,
      slug,
      organizerId,
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
    if (!slug) missingFields.push("slug");
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

      const eventData: EventData = {
        name,
        excerpt,
        description,
        location,
        image: cloudinaryData.secure_url,
        date: new Date(date),
        price: Number(price),
        availableSeats: parseInt(availableSeats, 10),
        slug,
        organizerId,
        isFree: isFree,
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
        promotions: true,
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
      createdAt: event.createdAt, // Added createdAt field
      updatedAt: event.updatedAt, // Added updatedAt field
      categories: event.CategoryEvent.map((category) => category.Category.name),
      // promotions: event.promotions.map((promotion) => ({
      //   id: promotion.id,
      //   name: promotion.name,
      //   discountValue: promotion.discountValue,
      //   limit: promotion.limit,
      //   referralCode: promotion.referralCode,
      //   validUntil: promotion.validUntil,
      // })),
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
        registrations: true,
        transactions: true,
        Attendee: true,
        promotions: true,
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
      registrations: event.registrations.map((registration) => ({
        id: registration.id,
        // Include other registration fields as necessary
      })),
      transactions: event.transactions.map((transaction) => ({
        id: transaction.id,
        // Include other transaction fields as necessary
      })),
      attendees: event.Attendee.map((attendee) => ({
        id: attendee.id,
        name: attendee.name,
        email: attendee.email,
        hasPaid: attendee.hasPaid,
        referralCode: attendee.referralCode,
      })),
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

    res.status(200).json({ ok: true, data: response });
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

// app.post("/create-event", upload.single("image"), CreateEvent);

// BACKUP

// export async function CreateEvent(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   try {
//     const {
//       title,
//       excerpt,
//       content,
//       location,
//       slug,
//       publishedDate,
//       categoryIds,
//     } = req.body;

//     const missingFields = [];
//     if (!title) missingFields.push("title");
//     if (!excerpt) missingFields.push("excerpt");
//     if (!content) missingFields.push("content");
//     if (!location) missingFields.push("location");
//     if (!slug) missingFields.push("slug");
//     if (!categoryIds || categoryIds.length <= 0)
//       missingFields.push("categoryIds");
//     if (!publishedDate) missingFields.push("publishedDate");

//     if (!req.file) {
//       missingFields.push("image");
//     }

//     if (missingFields.length > 0) {
//       const errorMessage = `Missing required fields: ${missingFields.join(
//         ", "
//       )}`;
//       logger(errorMessage);
//       res.status(400).json({ message: errorMessage });
//       return;
//     }

//     if (req.file) {
//       const cloudinaryData = await cloudinary.uploader.upload(req.file.path, {
//         folder: "blog/images",
//       });

//       await fs.unlink(req.file.path);

//       const newEvent = await prisma.event.create({
//         data: {
//           title,
//           excerpt,
//           content,
//           location,
//           slug,
//           image: cloudinaryData.secure_url,
//           publishedDate: new Date(publishedDate),
//           CategoryEvent: {
//             createMany: {
//               data: categoryIds.map((category: number) => ({
//                 categoryId: +category,
//               })),
//             },
//           },
//         },
//       });

//       if (new Date(publishedDate) < new Date()) {
//         await prisma.event.update({
//           where: { id: newEvent.id },
//           data: { published: true },
//         });
//       } else {
//         publishEvent(newEvent.id, new Date(publishedDate));
//       }

//       res.status(201).json({ ok: true, message: "New Event added" });
//     } else {
//       res.status(400).json({ message: "Image file is required" });
//     }
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       const errorMessage = `Unexpected error in CreateEvent: ${error.message}`;
//       logger(errorMessage);
//       next(error);
//     } else {
//       const errorMessage = `Unknown error occurred in CreateEvent`;
//       logger(errorMessage);
//       next(error);
//     }
//   }
// }

// export async function GetAllEvents(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   try {
//     const events = await prisma.event.findMany({
//       include: { CategoryEvent: { include: { Category: true } } },
//     });

//     const response = events.map((event) => ({
//       id: event.id,
//       title: event.title,
//       excerpt: event.excerpt,
//       image: event.image,
//       content: event.content,
//       location: event.location,
//       slug: event.slug,
//       published: event.published,
//       categories: event.CategoryEvent.map((category) => category.Category.name),
//     }));

//     res.status(200).json({ ok: true, data: response, cache: false });
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       const errorMessage = `Unexpected error in GetAllEvents: ${error.message}`;
//       logger(errorMessage);
//       next(error);
//     } else {
//       const errorMessage = `Unknown error occurred in GetAllEvents`;
//       logger(errorMessage);
//       next(error);
//     }
//   }
// }

// export async function GetSingleEvent(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   try {
//     const event = await prisma.event.findUnique({
//       where: { id: +req.params.id },
//       include: { CategoryEvent: { include: { Category: true } } },
//     });

//     if (!event) {
//       const errorMessage = `Event with ID ${req.params.id} not found`;
//       logger(errorMessage);
//       return res.status(404).json({ message: errorMessage });
//     }

//     const response = {
//       id: event.id,
//       title: event.title,
//       content: event.content,
//       image: event.image,
//       categories: event.CategoryEvent.map((category) => category.Category.name),
//       createdAt: event.createdAt,
//       updatedAt: event.updatedAt,
//     };

//     res.status(200).json({ ok: true, data: response });
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       const errorMessage = `Unexpected error in GetSingleEvent: ${error.message}`;
//       logger(errorMessage);
//       next(error);
//     } else {
//       const errorMessage = `Unknown error occurred in GetSingleEvent`;
//       logger(errorMessage);
//       next(error);
//     }
//   }
// }

// export async function getPublishedEvents(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   try {
//     const events = await prisma.event.findMany({
//       where: { published: true },
//       include: { CategoryEvent: { include: { Category: true } } },
//     });

//     res.status(200).json({ ok: true, data: events });
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       const errorMessage = `Unexpected error in getPublishedEvents: ${error.message}`;
//       logger(errorMessage);
//       next(error);
//     } else {
//       const errorMessage = `Unknown error occurred in getPublishedEvents`;
//       logger(errorMessage);
//       next(error);
//     }
//   }
// }
