import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";
import { uploadFile } from "../utils/cloudinary.js";
import { User } from "../models/user.model.js";

const sendMessage = asyncHandler(async (req, res) => {
  const senderId = req.user?._id;
  const receiverId = req.params?.id;

  // Validate sender and receiver
  if (!senderId)
    throw new ApiError(401, "Unauthorized: User not authenticated");
  if (!receiverId)
    throw new ApiError(400, "Bad Request: Receiver ID is required");

  // Check if receiver exists
  const receiver = await User.findById(receiverId);
  if (!receiver) throw new ApiError(404, "Receiver not found");

  const { text } = req.body;

  // Validate message content
  const hasText = text && text.trim() !== "";
  const hasFiles = req.files && req.files.length > 0;

  if (!hasText && !hasFiles) {
    throw new ApiError(400, "Bad Request: Text or file is required");
  }

  // File upload limit
  const MAX_FILES = 20;
  if (req.files && req.files.length > MAX_FILES) {
    throw new ApiError(400, `Bad Request: Maximum ${MAX_FILES} files allowed`);
  }

  // Find or create conversation
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

  // Upload files if present
  const fileUrls = [];
  if (hasFiles) {
    for (const file of req.files) {
      const fileUrl = await uploadFile(file.path);
      fileUrls.push(fileUrl);
    }
  }

  // Create new message
  const newMessage = await Message.create({
    text: hasText ? text.trim() : "",
    fileUrls: fileUrls,
    msgByUserId: senderId,
    seen: false, // By default, the message is unseen
  });

  // Add message to conversation
  conversation.messages.push(newMessage._id);
  await conversation.save();

  // Increment unseenMessages count for the receiver
  await User.findByIdAndUpdate(receiverId, {
    $inc: { unseenMessages: 1 }, // Increment unseenMessages count
    $set: { lastMessage: hasText ? text.trim() : "File shared" },
  });

  return res
    .status(201)
    .json(new ApiResponse(201, newMessage, "Message sent successfully"));
});

const getMessage = asyncHandler(async (req, res) => {
  const otherUserId = req.params?.id; // The ID of the other user in the chat
  const currentUserId = req.user?._id; // The logged-in user (receiver)

  // Validate IDs
  if (!currentUserId)
    throw new ApiError(401, "Unauthorized: User not authenticated");
  if (!otherUserId)
    throw new ApiError(400, "Bad Request: Other user ID is required");

  // Find conversation between the two users
  const conversation = await Conversation.findOne({
    $or: [
      { sender: currentUserId, receiver: otherUserId },
      { sender: otherUserId, receiver: currentUserId },
    ],
  }).populate({
    path: "messages",
    populate: { path: "msgByUserId", select: "username avatar" },
  });

  // Return empty if no conversation exists
  if (!conversation) {
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { messages: [] },
          "No conversation found. Start chatting!"
        )
      );
  }

  // Find all unseen messages where the logged-in user is the receiver
  const unseenMessages = conversation.messages.filter(
    (msg) =>
      msg.msgByUserId.toString() === otherUserId.toString() && // Messages sent by the other user
      !msg.seen // Messages are unseen
  );

  if (unseenMessages.length > 0) {
    // Mark these messages as seen
    await Message.updateMany(
      { _id: { $in: unseenMessages.map((msg) => msg._id) } },
      { $set: { seen: true } }
    );

    // Recalculate total unseen messages for the logged-in user
    const allConversations = await Conversation.find({
      $or: [{ sender: currentUserId }, { receiver: currentUserId }],
    });

    const allMessageIds = allConversations.flatMap((conv) => conv.messages);

    const totalUnseen = await Message.countDocuments({
      _id: { $in: allMessageIds },
      msgByUserId: { $ne: currentUserId }, // Messages sent by others
      seen: false, // Messages are unseen
    });

    // Update the user's unseenMessages count
    await User.findByIdAndUpdate(currentUserId, {
      $set: { unseenMessages: totalUnseen }, // Reset unseenMessages count
    });
  }

  // Format response without the `seen` field
  const formattedMessages = conversation.messages.map((msg) => ({
    _id: msg._id,
    text: msg.text,
    fileUrls: msg.fileUrls,
    msgByUserId: msg.msgByUserId,
    createdAt: msg.createdAt,
  }));

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { messages: formattedMessages },
        "Messages fetched successfully"
      )
    );
});

export { sendMessage, getMessage };
