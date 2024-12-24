import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { BlogValidation } from "./blogs.validation";
import { blogController } from "./blogs.controller";
import { validateQuery } from "../../middlewares/validateBlogQuery";
import Auth from "../../middlewares/auth";

const blogRouter = Router();

blogRouter.post(
  "/",
  Auth("user", "admin"),
  validateRequest(BlogValidation.blogsValidationSchema),
  blogController.createBlog
);
blogRouter.get("/", validateQuery, blogController.getAllBlogs);
blogRouter.get("/:blogId", Auth("admin", "user"), blogController.getSingleBlog);
blogRouter.patch(
  "/:blogId",
  Auth("user"),
  validateRequest(BlogValidation.updateBlogsValidationSchema),
  blogController.updateBlog
);

export default blogRouter;
