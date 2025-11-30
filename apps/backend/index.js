import express from "express";
import dotenv from "dotenv";
dotenv.config({
  path: "../../.env",
});
import connectDb from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import geminiResponse from "./gemini.js";

const app = express();
app.set("trust proxy", 1);
app.use(
  cors({
    origin: "https://ai-assistant-mwek.onrender.com",
    credentials: true,
  }),
);
const port = process.env.PORT || 5000;
app.use(express.json());
// Use the same secret variable you use for signing tokens (e.g., JWT_SECRET or COOKIE_SECRET)
app.use(cookieParser(process.env.JWT_SECRET));
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.listen(port, () => {
  connectDb();
  console.log("server started");
});





