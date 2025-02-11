import express, { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

// Add category
export async function AddCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await prisma.category.create({
      data: {
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        slug: req.body.slug,
      },
    });

    res.status(200).json({ message: "New category added" });
  } catch (error) {
    next(error);
  }
}

// Get all categories
export async function GetAllCategories(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const categories = await prisma.category.findMany();

    res.status(200).json({ ok: true, data: categories });
  } catch (error) {
    next(error);
  }
}
