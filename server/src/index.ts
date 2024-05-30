import express from "express";
import dontenv from "dotenv";

import helmet from "helmet";
import morgan from "morgan";
import cookieparser from "cookie-parser";
import cors from "cors";

import userRouter from "./router/user.router";
import postRouter from "./router/blog.router";
import errorHandler from "./controller/error.controller";
import commentRouter from "./router/comment.router";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(cookieparser());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/comment", commentRouter);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}  `);
});
