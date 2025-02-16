import express from "express";

import {
  CreateVouchers,
  GetSingleVouchers,
  GetAllVouchers,
} from "../controllers/voucher-controller";
import { roleGuard, verifyToken } from "../middleware/auth-middleware";

const router = express.Router();

router
  .route("/")
  .get(GetAllVouchers)
  .post(verifyToken, roleGuard("ORGANIZERS"), CreateVouchers);
router.route("/:id").get(GetSingleVouchers);

export default router;
