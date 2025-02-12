import express from "express";
import { getOrganizerDashboard } from "../controllers/dashboard-controller";
import { roleGuard, verifyToken } from "../middleware/auth-middleware";

const router = express.Router();

router
  .route("/")
  .get(verifyToken, 
    roleGuard("ORGANIZERS"), getOrganizerDashboard);

export default router;
