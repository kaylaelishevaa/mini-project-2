import express from "express";
import {
  AddCategory,
  GetAllCategories,
} from "../controllers/category-controller";

const router = express.Router();

router.route("/").get(GetAllCategories).post(AddCategory);

export default router;

// router
//   .route("/")
//   .get(verifyToken, roleGuard("ADMIN"), GetAllCategories)
//   .post(verifyToken, roleGuard("AUTHOR"), AddCategory);
