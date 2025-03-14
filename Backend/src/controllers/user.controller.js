import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadImage } from "../utils/cloudinary.js";
import { io, userSocketMap } from "../socket/socket.js";
import jwt from "jsonwebtoken";
import { Conversation } from "../models/conversation.model.js";
import bcrypt from "bcryptjs";

const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError(404, "User not found for token generation");
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating referesh and access token"
    );
  }
};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

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

  const user = await User.create({
    username: username.toLowerCase(),
    fullName,
    gender,
    password,
    age: parseInt(age),
    avatar,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username && !password) {
    throw new ApiError(400, "username is required");
  }

  const user = await User.findOne({ username });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged In Successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1, // this removes the field from document
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  };

  const userId = req.user._id.toString();
  if (userSocketMap[userId]) {
    const socketId = userSocketMap[userId];
    io.sockets.sockets.get(socketId)?.disconnect(true);
    delete userSocketMap[userId];
  }

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefereshTokens(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

const getOtherUsers = asyncHandler(async (req, res) => {
  const currentLoggedInUser = req.user._id;

  // Fetch all conversations involving the logged-in user
  const conversations = await Conversation.find({
    participants: { $in: [currentLoggedInUser] },
  }).populate("messages");

  // Prepare the response with unread message counts and latest messages
  const otherUsersDetails = conversations.map((conversation) => {
    const otherUserId = conversation.participants.find(
      (participant) => participant.toString() !== currentLoggedInUser
    );

    const unreadMessagesCount = conversation.messages.filter(
      (msg) => msg.receiverId.toString() === currentLoggedInUser && !msg.isRead
    ).length;

    // Get the latest message (including file if present)
    const latestMessage =
      conversation.messages.length > 0
        ? {
            message:
              conversation.messages[conversation.messages.length - 1].message,
            file:
              conversation.messages[conversation.messages.length - 1].file ||
              null,
          }
        : null;

    return {
      userId: otherUserId,
      unreadMessagesCount,
      latestMessage,
    };
  });

  // Fetch all other users (excluding the logged-in user)
  const otherUsers = await User.find({
    _id: { $ne: currentLoggedInUser },
  }).select("-password -refreshToken");

  // Merge user details with unread message counts and latest messages
  const enrichedUsers = otherUsers.map((user) => {
    const userDetails = otherUsersDetails.find(
      (details) => details.userId?.toString() === user._id.toString()
    );
    return {
      ...user.toObject(),
      unreadMessagesCount: userDetails?.unreadMessagesCount || 0,
      latestMessage: userDetails?.latestMessage || null,
    };
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        enrichedUsers,
        "All other users fetched successfully"
      )
    );
});

const editUser = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  if (!userId) {
    throw new ApiError(400, "User ID is required");
  }

  // Extract user input fields
  const { fullName, username, age, password } = req.body;

  if (!fullName && !username && !age && !password) {
    throw new ApiError(400, "No fields to update");
  }

  const updateData = {};

  if (fullName) updateData.fullName = fullName;
  if (username) updateData.username = username;
  if (age) updateData.age = age;
  if (password) updateData.password = await hashPassword(password);

  const files = req.files || {};
  if (files.avatar) {
    updateData.avatar = await uploadImage(files.avatar[0].path);
  }
  if (files.coverPhoto) {
    updateData.coverPhoto = await uploadImage(files.coverPhoto[0].path);
  }

  // Update user in one query
  const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
    new: true,
    runValidators: true,
    select: "-password -refreshToken",
  });

  if (!updatedUser) {
    throw new ApiError(404, "User not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedUser, "User profile updated successfully")
    );
});

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  getOtherUsers,
  editUser,
};
