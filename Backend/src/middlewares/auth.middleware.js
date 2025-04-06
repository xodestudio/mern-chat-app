import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    // Extract token from cookies or Authorization header
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "") ||
      "";

    if (!token) {
      throw new ApiError(401, "Unauthorized: No token provided");
    }

    // Verify the token
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Find the user by the decoded token's ID
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "Unauthorized: Invalid access token");
    }

    // Attach the user object to the request for further use
    req.user = user;

    // Move to the next middleware/controller
    next();
  } catch (error) {
    // Handle JWT-specific errors (e.g., token expired)
    if (error.name === "TokenExpiredError") {
      throw new ApiError(401, "Unauthorized: Access token has expired");
    }
    if (error.name === "JsonWebTokenError") {
      throw new ApiError(401, "Unauthorized: Invalid token");
    }

    // General error handling
    throw new ApiError(
      401,
      error?.message || "Unauthorized: Invalid access token"
    );
  }
});
