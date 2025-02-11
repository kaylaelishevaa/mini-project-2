import express from "express";
import { verifyToken, roleGuard } from "../middleware/auth-middleware";
import { topUpWallet, payTicket } from "../controllers/wallet-controller";

const router = express.Router();

// Hanya user role CUSTOMERS yg boleh topup & bayar
router.post("/topup", verifyToken, roleGuard("CUSTOMERS"), topUpWallet);
router.post("/pay", verifyToken, roleGuard("CUSTOMERS"), payTicket);

export default router;
