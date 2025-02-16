import express from "express";
import {
  AddCategory,
  GetAllCategories,
  GetEventByCategory,
} from "../controllers/category-controller";

const router = express.Router();

router.route("/").get(GetAllCategories).post(AddCategory);
router.route("/:id").get(GetEventByCategory);

export default router;
