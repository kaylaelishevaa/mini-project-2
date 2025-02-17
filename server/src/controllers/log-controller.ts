import { Request, Response, NextFunction } from "express";
import { PrismaClient, Role } from "@prisma/client";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";
import { loginSchema } from "../schemas/auth-schemas";

const prisma = new PrismaClient();

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { emailOrUsername, password } = loginSchema.parse(req.body);

    if (!emailOrUsername || !password) {
      res.status(400).json({ message: "Missing required fields!" });
      return;
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: emailOrUsername }, { username: emailOrUsername }],
      },
    });

    if (!existingUser) {
      res.status(400).json({ message: "User not found! " });
      return;
    }

    if (!existingUser.emailConfirmed) {
      res.status(400).json({ message: "Please complete your registration! " });
      return;
    }

    const isValidPassword = await compare(password, existingUser.password);

    if (!isValidPassword) {
      res.status(401).json({ message: "Invalid credentials!" });
      return;
    }

    const jwtPayload = {
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
      role: existingUser.role,
    };
    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET_KEY as string, {
      expiresIn: "24h",
    });

    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
      })
      .status(200)
      .json({ ok: true, message: "Login succeded!", role: existingUser.role });
  } catch (error) {
    next(error);
  }
}

export async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    req.user = null;
    res
      .clearCookie("token")
      .status(200)
      .json({ message: "Logout succesfully!" });
  } catch (error) {
    next(error);
  }
}

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Too many login attempts. Please try again later.",
});

export async function updateRole(
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

    const { role } = req.body;

    if (!role || !["CUSTOMERS", "ORGANIZERS"].includes(role)) {
      res.status(400).json({ message: "Invalid role" });
      return;
    }

    await prisma.user.update({
      where: { id: userId },
      data: { role: role as Role },
    });

    if (role !== "CUSTOMERS") {
      await prisma.point.deleteMany({
        where: { userId },
      });

      await prisma.coupon.deleteMany({
        where: { userId },
      });

      await prisma.user.update({
        where: { id: userId },
        data: { referralNumber: "" },
      });
    }

    res.status(200).json({ message: "Role updated successfully" });
  } catch (error) {
    next(error);
  }
}

export async function getCurrentUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      res.status(404).json({ message: "User not found." });
      return
    }

    // 1) Dapatkan semua point user yang belum expired
    const validPoints = await prisma.point.findMany({
      where: {
        userId: userId,
        expiresAt: {
          gte: new Date(), // hanya point yang belum kedaluwarsa
        },
      },
    });

    // 2) Hitung total point
    const totalPoints = validPoints.reduce((acc, p) => acc + p.pointsEarned, 0);

    // 3) Return data user + totalPoints
    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      referralNumber: user.referralNumber,
      wallet: user.walletBalance,
      emailConfirmed: user.emailConfirmed,
      createdAt: user.createdAt,
      points: totalPoints, // tambahkan di respons
    });
  } catch (error) {
    next(error);
  }
}