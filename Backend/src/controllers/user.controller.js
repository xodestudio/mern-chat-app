import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadImage, cropImage } from "../utils/cloudinary.js";
import bcrypt from "bcryptjs";

// Register User Controller
const registerUser = asyncHandler(async (req, res) => {
  const { fullName, username, gender, age, password, confirmPassword } =
    req.body;

  if (
    !fullName ||
    !username ||
    !gender ||
    !age ||
    !password ||
    !confirmPassword ||
    password !== confirmPassword
  ) {
    throw new ApiError(
      400,
      "All fields are required and passwords must match."
    );
  }

  const existingUser = await User.findOne({ username });

  if (existingUser) {
    throw new ApiError(409, "Username already exists.");
  }

  const avatarFilePath = req.files?.avatar?.[0]?.path;

  if (!avatarFilePath) {
    throw new ApiError(400, "Avatar is required.");
  }

  const avatar = await uploadImage(avatarFilePath);

  if (!avatar) {
    throw new ApiError(400, "Avatar upload failed.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username: username.toLowerCase(),
    fullName,
    gender,
    age: parseInt(age),
    password: hashedPassword,
    avatar: cropImage(avatar.public_id),
  });

  return res
    .status(201)
    .json(new ApiResponse(200, user, "User registered successfully"));
});

export { registerUser };
