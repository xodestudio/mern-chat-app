import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

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

//routes import
import userRouter from "./routes/user.routes.js";
import messageRouter from "./routes/message.routes.js";

//routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/messages", messageRouter);

export { app };
