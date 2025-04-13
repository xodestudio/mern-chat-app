import { Server } from "socket.io";
import http from "http";
import { app } from "../app.js";
import { Message } from "../models/message.model.js";
import { Conversation } from "../models/conversation.model.js";
import { User } from "../models/user.model.js";

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO with CORS configuration
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Map to track active users (userId -> socketId)
const userSocketMap = {};

// Handle user connection
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  const userId = socket.handshake.query.userId;

  if (userId && userId !== "undefined") {
    userSocketMap[userId] = socket.id; // Add user to active users map
    console.log(`User ${userId} added to active users`);
    broadcastOnlineUsers();
  }

  // Real-time text message sending
  socket.on("sendMessage", async (data) => {
    const { receiverId, text } = data;

    try {
      // Find or create conversation
      let conversation = await Conversation.findOne({
        $or: [
          { sender: userId, receiver: receiverId },
          { sender: receiverId, receiver: userId },
        ],
      });

      if (!conversation) {
        conversation = await Conversation.create({
          sender: userId,
          receiver: receiverId,
          messages: [],
        });
      }

      // Create new message
      const newMessage = await Message.create({
        text,
        msgByUserId: userId,
        seen: false,
      });

      // Add message to conversation
      conversation.messages.push(newMessage._id);
      await conversation.save();

      // Increment unseenMessages count for the receiver
      await User.findByIdAndUpdate(receiverId, {
        $inc: { unseenMessages: 1 },
        $set: { lastMessage: text },
      });

      // Check if receiver is online
      const receiverSocketId = userSocketMap[receiverId];
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("receiveMessage", {
          senderId: userId,
          text,
          createdAt: newMessage.createdAt,
        });
      } else {
        console.log(`Message saved for offline user ${receiverId}`);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  });

  // Real-time file sharing
  socket.on("sendFile", async (data) => {
    const { receiverId, fileUrl } = data;

    try {
      // Find or create conversation
      let conversation = await Conversation.findOne({
        $or: [
          { sender: userId, receiver: receiverId },
          { sender: receiverId, receiver: userId },
        ],
      });

      if (!conversation) {
        conversation = await Conversation.create({
          sender: userId,
          receiver: receiverId,
          messages: [],
        });
      }

      // Create new message with file URL
      const newMessage = await Message.create({
        fileUrls: [fileUrl],
        msgByUserId: userId,
        seen: false,
      });

      // Add message to conversation
      conversation.messages.push(newMessage._id);
      await conversation.save();

      // Increment unseenMessages count for the receiver
      await User.findByIdAndUpdate(receiverId, {
        $inc: { unseenMessages: 1 },
        $set: { lastMessage: "File shared" },
      });

      // Check if receiver is online
      const receiverSocketId = userSocketMap[receiverId];
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("receiveFile", {
          senderId: userId,
          fileUrl,
          createdAt: newMessage.createdAt,
        });
      } else {
        console.log(`File URL saved for offline user ${receiverId}`);
      }
    } catch (error) {
      console.error("Error sending file:", error);
    }
  });

  // Typing indicator
  socket.on("typing", (data) => {
    const { receiverId } = data;
    const receiverSocketId = userSocketMap[receiverId];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("userTyping", { senderId: userId });
    }
  });

  // Stop typing indicator
  socket.on("stopTyping", (data) => {
    const { receiverId } = data;
    const receiverSocketId = userSocketMap[receiverId];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("userStoppedTyping", { senderId: userId });
    }
  });

  // Handle user disconnection
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);

    if (userId && userId !== "undefined") {
      delete userSocketMap[userId]; // Remove user from active users map
      console.log(`User ${userId} removed from active users`);
      broadcastOnlineUsers();
    }

    socket.removeAllListeners();
  });
});

// Broadcast updated list of online users
function broadcastOnlineUsers() {
  const onlineUsers = Object.keys(userSocketMap);
  io.emit("onlineUsers", onlineUsers); // Emit to all clients
}

// Export server and io instance
export { io, server, userSocketMap };
