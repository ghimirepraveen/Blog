import Router from "express";
import auth from "../middleware/auth";
import {
  getCommentsByPostId,
  writeComment,
} from "../controller/comment.controller";

const commentRouter = Router();
commentRouter.get("/getall/:postid", getCommentsByPostId);

commentRouter.use(auth);
commentRouter.post("/create/:postid", writeComment);

export default commentRouter;
