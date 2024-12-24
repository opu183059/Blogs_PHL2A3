"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const blogs_validation_1 = require("./blogs.validation");
const blogs_controller_1 = require("./blogs.controller");
const validateBlogQuery_1 = require("../../middlewares/validateBlogQuery");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const blogRouter = (0, express_1.Router)();
// create blog
blogRouter.post("/", (0, auth_1.default)("user", "admin"), (0, validateRequest_1.default)(blogs_validation_1.BlogValidation.blogsValidationSchema), blogs_controller_1.blogController.createBlog);
// get all blogs (Public route)
blogRouter.get("/", validateBlogQuery_1.validateQuery, blogs_controller_1.blogController.getAllBlogs);
// get single blog for both user and admin
blogRouter.get("/:blogId", (0, auth_1.default)("admin", "user"), blogs_controller_1.blogController.getSingleBlog);
// update blog
blogRouter.patch("/:blogId", (0, auth_1.default)("user"), (0, validateRequest_1.default)(blogs_validation_1.BlogValidation.updateBlogsValidationSchema), blogs_controller_1.blogController.updateBlog);
// delete blog
blogRouter.delete("/:blogId", (0, auth_1.default)("user"), blogs_controller_1.blogController.deleteBlog);
exports.default = blogRouter;
