import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { CustomJWTPayload } from "../types/express";

export async function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.status(401).json({ message: "Please login first!" });
      return;
    }

    const verifiedUser = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    ) as CustomJWTPayload;
    
    req.user = verifiedUser;


    next();
  } catch (error) {
    next(error);
  }
}

export function roleGuard(role: string) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      if (req.user?.role !== role) {
        res.status(401).json({ message: "Unauthorized access. Forbidden!" });
        return;
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}
