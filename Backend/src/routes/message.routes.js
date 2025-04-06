import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload, handleUploadError } from "../middlewares/multer.middleware.js";
import { sendMessage, getMessage } from "../controllers/message.controller.js";

const router = Router();

router.post(
  "/send/:id",
  verifyJWT,
  upload.array("files"),
  handleUploadError,
  sendMessage
);
router.post("/get/:id", verifyJWT, getMessage);

export default router;
