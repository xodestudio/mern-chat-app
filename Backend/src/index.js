import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { server } from "./socket/socket.js";

dotenv.config({
  path: "./env",
});

connectDB()
  .then(() => {
    server.listen(process.env.PORT || 3000, () => {
      console.log(
        `⚙️  Server is running at port : localhost:${process.env.PORT}`
      );
    });
  })
  .catch((error) => {
    console.log("MONGO db connection failed !!! ", error);
  });
