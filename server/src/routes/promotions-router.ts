import express from "express";

import {
  CreatePromotions,
  GetSinglePromotions,
  GetAllPromotions,
} from "../controllers/promotion-controller";

const router = express.Router();

router.route("/").get(GetAllPromotions).post(CreatePromotions);
router.route("/:id").get(GetSinglePromotions);

export default router;
