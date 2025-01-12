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

  if (!senderId) {
    throw new ApiError(401, "Unauthorized: User not authenticated");
  }

  if (!receiverId) {
    throw new ApiError(400, "Bad Request: Receiver ID is required");
  }

  const conversation = await Conversation.findOne({
    $all: [senderId, receiverId],
  }).populate("messages");

  if (!conversation) {
    throw new ApiError(404, "No conversation found between these users");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        conversation?.messages,
        "Message fetched successfully"
      )
    );
});

export { sendMessage, getMessage };
