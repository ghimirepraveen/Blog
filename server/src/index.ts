import express from "express";
import dontenv from "dotenv";
import userRouter from "./router/user.router";

dontenv.config();

const app = express();

app.use(express.json());
app.use("/api/users", userRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}  `);
});
