import express from "express";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";

// Express app setup
const app = express();

// Middleware
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// Routes import
import userRouter from "../routes/user.routes.js";
import messageRouter from "../routes/message.routes.js";

// Routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/messages", messageRouter);

// HTTP server creation
const server = http.createServer(app);

// Socket.io setup
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  const userId = socket.handshake.query.userId;

  if (userId && userId !== "undefined") {
    userSocketMap[userId] = socket.id;
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", (socket) => {
    console.log("user disconnected", socket.id);

    if (userId && userSocketMap[userId]) {
      delete userSocketMap[userId];
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

// Exporting server and app
export { io, server, app, userSocketMap };
