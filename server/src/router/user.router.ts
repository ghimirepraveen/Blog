import Router from "express";
import { register, login, logout } from "../controller/user.controller";
const userRouter = Router();

userRouter.post("/register");

userRouter.post("/login");

export default userRouter;
