import { Server } from "socket.io";
import http from "http";
import { app } from "../app.js";

// HTTP server creation
const server = http.createServer(app);

// Socket.io setup
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Store active user sockets
const userSocketMap = new Map();

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  const userId = socket.handshake.query.userId;

  if (userId && userId !== "undefined") {
    userSocketMap.set(userId, socket.id);
  }

  // Emit updated online users
  io.emit("getOnlineUsers", [...userSocketMap.keys()]);

  socket.on("sendMessage", (data) => {
    const { receiverId } = data;
    const receiverSocketId = userSocketMap.get(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("receiveMessage", data);
    }
  });

  // Handle typing event
  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });

  // Handle stop typing event
  socket.on("stopTyping", (data) => {
    socket.broadcast.emit("stopTyping", data);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);

    if (userId) {
      userSocketMap.delete(userId);
    }

    io.emit("getOnlineUsers", [...userSocketMap.keys()]);

    // Clean up all listeners for this socket
    socket.removeAllListeners();
  });
});

// Exporting server and app
export { io, server, userSocketMap };
