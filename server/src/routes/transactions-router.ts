import express from "express";
import {
  createTransaction,
  getAllTransaction,
} from "../controllers/transaction-controller";
import { roleGuard, verifyToken } from "../middleware/auth-middleware";

const router = express.Router();

router
  .route("/")
  .get(verifyToken, roleGuard("CUSTOMERS"), getAllTransaction)
  .post(verifyToken, roleGuard("CUSTOMERS"), createTransaction);

export default router;
