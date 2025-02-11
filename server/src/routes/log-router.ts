import express from "express"
import { getCurrentUser, login, loginLimiter, logout, updateRole } from "../controllers/log-controller"
import { verifyToken } from "../middleware/auth-middleware"

const router = express.Router()

router.route("/login").post(loginLimiter, login)
router.route("/logout").post(logout)
router.route("/update-role").patch(verifyToken, updateRole)
router.route("/me").get(verifyToken, getCurrentUser)

export default router; 