"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const blogs_model_1 = require("./blogs.model");
const createBlog = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = (yield blogs_model_1.Blog.create(payload)).populate("author", {
        name: 1,
        email: 1,
    });
    return result;
});
const updateBlog = (blogId, userID, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const findBlogById = yield blogs_model_1.Blog.findById(blogId);
    if (!findBlogById) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Blog not found");
    }
    else if (findBlogById.author && findBlogById.author.toString() !== userID) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You are not allowed to update this blog");
    }
    const result = yield blogs_model_1.Blog.findOneAndUpdate({ _id: blogId, author: userID }, payload, {
        new: true,
    }).populate("author", {
        name: 1,
        email: 1,
    });
    return result;
});
const getAllBlogs = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, sortBy, sortOrder, filter } = query;
    const conditions = {};
    const sort = {};
    if (search) {
        conditions.$or = [
            { title: { $regex: search, $options: "i" } },
            { content: { $regex: search, $options: "i" } },
        ];
    }
    if (filter) {
        conditions.author = filter;
    }
    if (sortBy) {
        sort[sortBy] = sortOrder === "desc" ? -1 : 1;
    }
    const result = yield blogs_model_1.Blog.find(conditions).sort(sort).populate("author", {
        name: 1,
        email: 1,
        _id: 0,
    });
    return result;
});
const getSingleBlog = (blogId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blogs_model_1.Blog.findById(blogId).populate("author", {
        name: 1,
        email: 1,
        _id: 0,
    });
    return result;
});
const deleteBlog = (blogId, userID) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blogs_model_1.Blog.findById(blogId);
    if (!blog) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Blog not found");
    }
    else if (blog.author && blog.author.toString() !== userID) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You are not allowed to delete this blog");
    }
    const result = yield blogs_model_1.Blog.findByIdAndDelete(blogId);
    return result;
});
exports.blogService = {
    createBlog,
    getAllBlogs,
    getSingleBlog,
    updateBlog,
    deleteBlog,
};
