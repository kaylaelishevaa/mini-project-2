import "dotenv/config";

import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

import errorMiddleware from "./middleware/error-middleware";
import notFoundMiddleware from "./middleware/not-found-middleware";
import registerRouter from "./routes/register-router";
import logRouter from "./routes/log-router";
import confirmEmailRouter from "./routes/confirm-email-router";
import pointsRouter from "./routes/points-router";
import cookieParser from "cookie-parser";
import { getOrganizerDashboard } from "./controllers/dashboard-controller";
import walletRouter from "./routes/wallet-router";
import eventRouter from "./routes/event-router";
import categoryRouter from "./routes/category-router";
import reviewRouter from "./routes/review-router";
import promotionsRouter from "./routes/promotions-router";

const app = express();
const PORT = 8000;
const prisma = new PrismaClient();

app.use(express.json());

app.use(cookieParser());

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.get("/api/v1", (req, res) => {
  res.status(200).send("<h1>Welcome!</h1>");
});

app.use("/api/v1/auth/register", registerRouter);
app.use("/api/v1/auth", logRouter);
app.use("/api/v1/confirm", confirmEmailRouter);
app.use("/api/v1", pointsRouter);
app.use("/api/v1/wallet", walletRouter);
app.use("/api/v1/dashboard", getOrganizerDashboard);
app.use("/api/v1/events", eventRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/review", reviewRouter);
app.use("/api/v1/promotions", promotionsRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is listening on: ${PORT}`);
});
