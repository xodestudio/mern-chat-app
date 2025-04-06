import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";
import { uploadFile } from "../utils/cloudinary.js";

const sendMessage = asyncHandler(async (req, res) => {
  const senderId = req.user?._id;
  const receiverId = req.params?.id;

  // Validate sender and receiver
  if (!senderId)
    throw new ApiError(401, "Unauthorized: User not authenticated");

  if (!receiverId)
    throw new ApiError(400, "Bad Request: Receiver ID is required");

  // Check if receiver exists in the database
  const receiver = await User.findById(receiverId);
  if (!receiver) {
    throw new ApiError(404, "Receiver not found");
  }

  const { text } = req.body;

  // Check if at least one of text or file is provided
  const hasText = text && text.trim() !== ""; // Check if text is valid
  const hasFiles = req.files && req.files.length > 0; // Check if files exist

  if (!hasText && !hasFiles) {
    throw new ApiError(400, "Bad Request: Text or file is required");
  }

  // Enforce an upper limit on the number of files (optional)
  const MAX_FILES = 20; // Set your desired limit here
  if (req.files && req.files.length > MAX_FILES) {
    throw new ApiError(
      400,
      `Bad Request: You can upload a maximum of ${MAX_FILES} files`
    );
  }

  // Find or create a conversation
  let conversation = await Conversation.findOne({
    $or: [
      { sender: senderId, receiver: receiverId },
      { sender: receiverId, receiver: senderId },
    ],
  });

  if (!conversation) {
    conversation = await Conversation.create({
      sender: senderId,
      receiver: receiverId,
      messages: [],
    });
  }

  // Upload files to Cloudinary if present
  const fileUrls = [];
  if (hasFiles) {
    for (const file of req.files) {
      const fileUrl = await uploadFile(file.path); // Upload file to Cloudinary
      fileUrls.push(fileUrl);
    }
  }

  // Create a new message
  const newMessage = await Message.create({
    text: hasText ? text.trim() : "",
    fileUrls: fileUrls, // Save array of file URLs
    msgByUserId: senderId,
  });

  // Add the message to the conversation
  conversation.messages.push(newMessage._id);
  await conversation.save();

  // Increment the unseen messages count for the receiver
  await User.findByIdAndUpdate(receiverId, { $inc: { unseenMessages: 1 } });

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
    $or: [
      { sender: senderId, receiver: receiverId },
      { sender: receiverId, receiver: senderId },
    ],
  }).populate({
    path: "messages",
    populate: { path: "msgByUserId", select: "username avatar" },
  });

  // If no conversation exists, return an empty state
  if (!conversation) {
    return res.status(200).json(
      new ApiResponse(
        200,
        {
          messages: [],
        },
        "No conversation found. Start chatting!"
      )
    );
  }

  // Mark all unseen messages as seen for the current user
  const unseenMessages = conversation.messages.filter(
    (msg) => !msg.seen && msg.msgByUserId.toString() !== senderId.toString()
  );

  if (unseenMessages.length > 0) {
    // Update the `seen` status of unseen messages
    await Message.updateMany(
      { _id: { $in: unseenMessages.map((msg) => msg._id) } },
      { $set: { seen: true } }
    );

    // Reset the unseen messages count for the current user
    await User.findByIdAndUpdate(senderId, { $set: { unseenMessages: 0 } });

    // Save the updated conversation
    await conversation.save();
  }

  // Return the conversation data
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        messages: conversation.messages.map((msg) => ({
          _id: msg._id,
          text: msg.text,
          fileUrls: msg.fileUrls,
          seen: msg.seen,
          msgByUserId: msg.msgByUserId,
          createdAt: msg.createdAt,
        })),
      },
      "Messages fetched successfully"
    )
  );
});

export { sendMessage, getMessage };
