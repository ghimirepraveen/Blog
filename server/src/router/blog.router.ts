import { Router } from "express";
import {
  writeBlog,
  deleteBlog,
  getBlog,
  getBlogs,
  updateBlog,
  searchBlog,
} from "../controller/blog.controller";
import auth from "../middleware/auth";

const blogRouter = Router();

blogRouter.get("/", getBlogs);
blogRouter.get("/:id", getBlog);
blogRouter.get("/search", searchBlog);

blogRouter.use(auth);

blogRouter.post("/create", writeBlog);
blogRouter.put("/update/:id", updateBlog);
blogRouter.delete("delete/:id", deleteBlog);

export default blogRouter;
