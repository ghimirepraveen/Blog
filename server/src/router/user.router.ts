import Router from "express";
import {
  register,
  login,
  logout,
  me,
  updateMe,
  deleteMe,
  changePassword,
  forgetPassword,
  resetPassword,
} from "../controller/user.controller";
import auth from "../middleware/auth";
const userRouter = Router();

userRouter.post("/register", register);

userRouter.post("/login", login);
userRouter.post("/forgotpassword", forgetPassword);
userRouter.post("/resetpassword", resetPassword);

userRouter.use(auth);
userRouter.post("/logout", logout);
userRouter.put("/update", updateMe);
userRouter.get("/me", me);
userRouter.post("/changepassword", changePassword);

userRouter.delete("/delete", deleteMe);

export default userRouter;
