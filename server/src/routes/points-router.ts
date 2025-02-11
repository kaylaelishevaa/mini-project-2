import express from "express"
import { redeemPoints, checkoutTicket, getActiveCoupon, getPoints } from "../controllers/points-controller"
import { roleGuard, verifyToken } from "../middleware/auth-middleware"

const router = express.Router()

router.route("/redeem-points").post(roleGuard("CUSTOMERS"), redeemPoints)
router.route("/checkout").post(roleGuard("CUSTOMERS"), checkoutTicket)
router.route("/points").get(verifyToken, roleGuard("CUSTOMERS"), getPoints)
router.route("/active-coupon").get(verifyToken, roleGuard("CUSTOMERS"), getActiveCoupon)


export default router; 