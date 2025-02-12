import { upload } from "./../middleware/upload-middleware";
import express from "express";

import {
  CreateEvent,
  GetSingleEvent,
  GetAllEvents,
} from "../controllers/event-controller";
import { roleGuard, verifyToken } from "../middleware/auth-middleware";

const router = express.Router();

router.route("/").get(GetAllEvents).post(verifyToken, roleGuard("ORGANIZERS"), upload.single("image"));
router.route("/:id").get(GetSingleEvent);

export default router;
function asynchandler(CreateEvent: (req: express.Request, res: express.Response, next: express.NextFunction) => Promise<express.Response<any, Record<string, any>> | undefined>): import("express-serve-static-core").RequestHandler<{}, any, any, import("qs").ParsedQs, Record<string, any>> {
    throw new Error("Function not implemented.");
}

