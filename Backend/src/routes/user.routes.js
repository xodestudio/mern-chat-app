import { Router } from "express";
import { upload, handleUploadError } from "../middlewares/multer.middleware.js";
import { registerUser } from "../controllers/user.controller.js";

const router = Router();

router
  .route("/register")
  .post(
    upload.fields([{ name: "avatar", maxCount: 1 }]),
    handleUploadError,
    registerUser
  );

export default router;
