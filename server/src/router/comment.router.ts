import Router from "express";
import auth from "../middleware/auth";
import { getComment, writeComment } from "../controller/comment.controller";

const commentRouter = Router();
commentRouter.get("/getall/:postid", getComment);

commentRouter.use(auth);
commentRouter.post("/create/:postid", writeComment);

export default commentRouter;
