// reviewController.ts

import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

const prisma = new PrismaClient();

export const CreateReview = async (req: Request, res: Response) => {
  const { overallExperience, qualityOfEvent, suggestions, eventId } = req.body;

  try {
    const review = await prisma.eventReview.create({
      data: {
        overallExperience,
        qualityOfEvent,
        suggestions,
        eventId,
      },
    });
    res.status(201).json({ ok: true, message: "New Review added" });
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ message: "Error creating review" });
  }
};

// Function to get all event reviews (optional)
export const getAllReviews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reviews = await prisma.eventReview.findMany();
    res.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    next(error);
  }
};
