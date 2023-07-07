import express, { urlencoded } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { userRouter } from "./router/userRotuer.js";
import { calendarRouter } from "./router/calendarRouter.js";
import cors from "cors";
import { communityRouter } from "./router/communityRouter.js";
import commentRouter from "./router/commentRouter.js";
import path from "path";
import newsRouter from "./router/newsRouter.js";

dotenv.config();

const app = express();
const port = 3000;

// 미들웨어 설정
app.use(express.json()); // JSON 요청을 파싱하기 위한 미들웨어
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB에 연결되었습니다.");
  })
  .catch((err) => {
    console.error("MongoDB 연결 중 오류가 발생했습니다:", err);
  });

// 라우트 설정
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api", userRouter);
app.use("/api", calendarRouter);
app.use("/api/community", communityRouter);
app.use("/api/comment", commentRouter);
app.use("/api/news", newsRouter);

// 서버 시작
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
