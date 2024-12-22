import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { BlogValidation } from "./blogs.validation";
import { blogController } from "./blogs.controller";

const blogRouter = Router();

blogRouter.post(
  "/",
  validateRequest(BlogValidation.blogsValidationSchema),
  blogController.createBlog
);
blogRouter.get("/", blogController.getAllBlogs);
blogRouter.get("/:blogId", blogController.getSingleBlog);

export default blogRouter;
