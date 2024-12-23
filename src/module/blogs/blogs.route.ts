import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { BlogValidation } from "./blogs.validation";
import { blogController } from "./blogs.controller";
import { validateQuery } from "../../middlewares/validateBlogQuery";
import Auth from "../../middlewares/auth";

const blogRouter = Router();

blogRouter.post(
  "/",
  Auth("user"),
  validateRequest(BlogValidation.blogsValidationSchema),
  blogController.createBlog
);
blogRouter.get("/", validateQuery, blogController.getAllBlogs);
blogRouter.get("/:blogId", blogController.getSingleBlog);

export default blogRouter;
