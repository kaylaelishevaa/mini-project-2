import { JwtPayload } from "jsonwebtoken";

interface CustomJWTPayload extends JwtPayload {
  id: number;
  name: string;
  email: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: CustomJWTPayload | null;
    }
  }
}

interface EventData {
  name: string;
  excerpt: string;
  description: string;
  location: string;
  image: string;
  date: Date;
  price: number;
  availableSeats: number;
  slug: string;
  organizerId: number;
  isFree: boolean;
  CategoryEvent: {
    createMany: {
      data: { categoryId: number }[];
    };
  };
  promotions?: {
    create: {
      name: string;
      discountValue: number;
      limit: number;
      referralCode: string;
      validUntil: Date;
    }[];
  };
}
