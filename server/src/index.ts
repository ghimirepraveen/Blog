import express from "express";
import dontenv from "dotenv";
import userRouter from "./router/user.router";
import errorHandler from "./controller/error.controller";
import helmet from "helmet";
import morgan from "morgan";

dontenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("common"));

app.use("/api/user", userRouter);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}  `);
});
