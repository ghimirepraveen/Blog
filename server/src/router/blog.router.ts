import { Router } from "express";
import { Request, Response } from "express";
import {
  writeBlog,
  deleteBlog,
  getBlog,
  getBlogs,
  editBlog,
  searchBlog,
} from "../controller/blog.controller";
import auth from "../middleware/auth";
import uploadToMemory from "../config/multer";

const blogRouter = Router();

blogRouter.get("/getall", getBlogs);
blogRouter.get("/getbyid/:id", getBlog);
blogRouter.get("/searchh", searchBlog);
blogRouter.use(auth);

blogRouter.post("/create", uploadToMemory.single("image"), writeBlog);
blogRouter.put("/edit/:id", uploadToMemory.single("image"), editBlog);
blogRouter.delete("/delete/:id", deleteBlog);

export default blogRouter;
