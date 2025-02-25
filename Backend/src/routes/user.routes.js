import { Router } from "express";
import { upload, handleUploadError } from "../middlewares/multer.middleware.js";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  getOtherUsers,
  editUser,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router
  .route("/register")
  .post(
    upload.fields([{ name: "avatar", maxCount: 1 }]),
    handleUploadError,
    registerUser
  );

router.route("/login").post(loginUser);

//secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/other-users").get(verifyJWT, getOtherUsers);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/edit-profile").put(
  verifyJWT,
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverPhoto", maxCount: 1 },
  ]),
  handleUploadError,
  editUser
);

export default router;
