import express from "express";
import {
  confirmEmail,
  checkEmailStatus,
} from "../controllers/confirm-email-controller";
import { verifyToken } from "../middleware/auth-middleware";

const router = express.Router();

router.route("/email").get(confirmEmail);
router.route("/status").get(verifyToken, checkEmailStatus);

export default router;
