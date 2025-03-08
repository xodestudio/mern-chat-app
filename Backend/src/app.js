import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

// Environment variables setup
dotenv.config();

// Express app setup
const app = express();

// Middleware
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);

// Routes import
import userRouter from "./routes/user.routes.js";
import messageRouter from "./routes/message.routes.js";

// Routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/messages", messageRouter);

export { app };
