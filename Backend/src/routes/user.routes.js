import { Router } from "express";
import { upload, handleUploadError } from "../middlewares/multer.middleware.js";
import { registerUser, loginUser } from "../controllers/user.controller.js";

const router = Router();

router
  .route("/register")
  .post(
    upload.fields([{ name: "avatar", maxCount: 1 }]),
    handleUploadError,
    registerUser
  );

router.route("/login").post(loginUser);

export default router;
