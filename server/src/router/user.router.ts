import Router from "express";
import { register, login, logout, me } from "../controller/user.controller";
import auth from "../middleware/auth";
const userRouter = Router();

userRouter.post("/register", register);

userRouter.post("/login", login);

userRouter.post("/logout", auth, logout);
userRouter.get("/me", auth, me);

export default userRouter;
