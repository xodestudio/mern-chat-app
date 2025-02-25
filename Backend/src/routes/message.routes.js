import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  sendMessage,
  getMessage,
  markMessagesAsRead,
} from "../controllers/message.controller.js";

const router = Router();

router.route("/send-message/:id").post(verifyJWT, sendMessage);
router.route("/get-message/:id").post(verifyJWT, getMessage);
router.route("/mark-messages-as-read/:id").post(verifyJWT, markMessagesAsRead);

export default router;
