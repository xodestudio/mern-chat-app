import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";
import { uploadImage } from "../utils/cloudinary.js";

const sendMessage = asyncHandler(async (req, res) => {
  const senderId = req.user?._id;
  const receiverId = req.params?.id;

  if (!senderId) {
    throw new ApiError(401, "Unauthorized: User not authenticated");
  }

  if (!receiverId) {
    throw new ApiError(400, "Bad Request: Receiver ID is required");
  }

  const { message } = req.body;

  const files = req.files || {};

  if ((!message || message.trim() === "") && !files.file) {
    throw new ApiError(400, "Bad Request: Message or file is required");
  }

  let gotConversation = await Conversation.findOne({
    participants: { $all: [senderId, receiverId] },
  });

  if (!gotConversation) {
    gotConversation = await Conversation.create({
      participants: [senderId, receiverId],
      messages: [],
    });
  }

  // Upload file to Cloudinary if present
  let fileUrl = null;
  if (files.file) {
    fileUrl = await uploadImage(files.file[0].path);
  }

  const newMessage = await Message.create({
    senderId,
    receiverId,
    message: message ? message.trim() : null,
    file: fileUrl,
  });

  if (newMessage) {
    gotConversation.messages.push(newMessage._id);
  }

  await gotConversation.save();

  return res
    .status(201)
    .json(new ApiResponse(201, newMessage, "Message sent successfully"));
});

const getMessage = asyncHandler(async (req, res) => {
  const receiverId = req.params?.id;
  const senderId = req.user?._id;

  // Validate sender and receiver IDs
  if (!senderId) {
    throw new ApiError(401, "Unauthorized: User not authenticated");
  }
  if (!receiverId) {
    throw new ApiError(400, "Bad Request: Receiver ID is required");
  }

  // Find the conversation between the two users
  const conversation = await Conversation.findOne({
    participants: { $all: [senderId, receiverId] },
  }).populate("messages");

  // If no conversation exists, return an empty state
  if (!conversation) {
    return res.status(200).json(
      new ApiResponse(
        200,
        {
          messages: [], // Empty array for messages
          unreadMessagesCount: 0, // No unread messages
          latestMessage: null, // No latest message
        },
        "No conversation found. Start chatting!"
      )
    );
  }

  // Calculate unread messages
  const unreadMessagesCount = conversation.messages.filter(
    (msg) => msg.receiverId.toString() === senderId && !msg.isRead
  ).length;

  // Get the latest message
  const latestMessage =
    conversation.messages.length > 0
      ? conversation.messages[conversation.messages.length - 1]
      : null;

  // Return the conversation data
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        messages: conversation.messages.map((msg) => ({
          _id: msg._id,
          senderId: msg.senderId,
          receiverId: msg.receiverId,
          message: msg.message,
          file: msg.file, // Include file URL
          isRead: msg.isRead,
          createdAt: msg.createdAt,
        })),
        unreadMessagesCount,
        latestMessage: latestMessage
          ? {
              _id: latestMessage._id,
              senderId: latestMessage.senderId,
              receiverId: latestMessage.receiverId,
              message: latestMessage.message,
              file: latestMessage.file,
              isRead: latestMessage.isRead,
              createdAt: latestMessage.createdAt,
            }
          : null,
      },
      "Message fetched successfully"
    )
  );
});

const markMessagesAsRead = asyncHandler(async (req, res) => {
  const senderId = req.user?._id;
  const receiverId = req.params?.id;

  if (!senderId) {
    throw new ApiError(401, "Unauthorized: User not authenticated");
  }
  if (!receiverId) {
    throw new ApiError(400, "Bad Request: Receiver ID is required");
  }

  // Find the conversation between the two users
  const conversation = await Conversation.findOne({
    participants: { $all: [senderId, receiverId] },
  });

  if (!conversation) {
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { updatedMessagesCount: 0 },
          "No unread messages to mark as read."
        )
      );
  }

  // Mark all unread messages sent to the senderId as read
  const updatedMessages = await Message.updateMany(
    {
      _id: { $in: conversation.messages },
      receiverId: senderId,
      isRead: false,
    },
    { $set: { isRead: true } }
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { updatedMessagesCount: updatedMessages.modifiedCount },
        "Messages marked as read successfully."
      )
    );
});

export { sendMessage, getMessage, markMessagesAsRead };
