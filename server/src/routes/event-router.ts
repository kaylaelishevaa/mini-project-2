import express from "express";

import {
  CreateEvent,
  GetSingleEvent,
  GetAllEvents,
  GetEventByCurrentCustomerId,
  GetEventByCurrentOrganizerId,
} from "../controllers/event-controller";
import { upload } from "./../middleware/upload-middleware";
import { roleGuard, verifyToken } from "../middleware/auth-middleware";

const router = express.Router();

router
  .route("/")
  .get(GetAllEvents)
  .post(
    verifyToken,
    roleGuard("ORGANIZERS"),
    upload.single("image"),
    CreateEvent
  );
router
  .route("/attended")
  .get(verifyToken, roleGuard("CUSTOMERS"), GetEventByCurrentCustomerId);
router
  .route("/created")
  .get(verifyToken, roleGuard("ORGANIZERS"), GetEventByCurrentOrganizerId);
router.route("/:id").get(GetSingleEvent);

export default router;

function asynchandler(
  fn: (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => Promise<any>
): express.RequestHandler {
  return (req, res, next) => {
    return fn(req, res, next).catch(next);
  };
}
