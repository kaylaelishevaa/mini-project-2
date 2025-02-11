import express from "express";
import { getOrganizerDashboard } from "../controllers/dashboard-controller";
import { roleGuard } from "../middleware/auth-middleware";

const router = express.Router();

router
  .route("/")
  .post(roleGuard("ORGANIZERS"), getOrganizerDashboard);

export default router;
