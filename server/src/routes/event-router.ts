import { upload } from "./../middleware/upload-middleware";
import express from "express";

import {
  CreateEvent,
  GetSingleEvent,
  GetAllEvents,
} from "../controllers/event-controller";
import { roleGuard, verifyToken } from "../middleware/auth-middleware";

const router = express.Router();

router.route("/").get(GetAllEvents).post(upload.single("image"), CreateEvent);
// verifyToken,
// roleGuard("ORGANIZERS"),

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
