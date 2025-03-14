import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload, handleUploadError } from "../middlewares/multer.middleware.js";
import { sendMessage, getMessage } from "../controllers/message.controller.js";

const router = Router();

router
  .route("/send-message/:id")
  .post(
    verifyJWT,
    upload.fields([{ name: "file", maxCount: 1 }]),
    handleUploadError,
    sendMessage
  );
router.route("/get-message/:id").post(verifyJWT, getMessage);

export default router;
