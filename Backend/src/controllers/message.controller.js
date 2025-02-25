import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";

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

  if (!message || message.trim() === "") {
    throw new ApiError(400, "Bad Request: Message content is required");
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

  const newMessage = await Message.create({
    senderId,
    receiverId,
    message: message.trim(),
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
      ? conversation.messages[conversation.messages.length - 1].message
      : null;

  // Return the conversation data
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        messages: conversation.messages,
        unreadMessagesCount,
        latestMessage,
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
    throw new ApiError(404, "No conversation found between these users");
  }

  // Mark all unread messages sent to the senderId as read
  await Message.updateMany(
    {
      senderId: receiverId,
      receiverId: senderId,
      isRead: false,
    },
    { $set: { isRead: true } }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Messages marked as read"));
});

export { sendMessage, getMessage, markMessagesAsRead };
