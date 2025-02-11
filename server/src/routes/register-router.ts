import express from "express"
import {register } from "../controllers/register-controller"

const router = express.Router()

router.route("/").post(register)

export default router; 