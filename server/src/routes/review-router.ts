import express from "express";

// import {
//   CreateEvent,
//   GetSingleEvent,
//   GetAllEvents,
// } from "../controllers/event-controller";

import { CreateReview, getAllReviews } from "../controllers/review-controller";

const router = express.Router();

router.route("/").post(CreateReview).get(getAllReviews);

export default router;
