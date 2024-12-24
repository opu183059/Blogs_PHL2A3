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
exports.blogController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const blogs_service_1 = require("./blogs.service");
const createBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    payload.author = req.user.userID;
    const result = yield blogs_service_1.blogService.createBlog(payload);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Blog created successfully",
        statusCode: http_status_1.default.CREATED,
        data: {
            _id: result._id,
            title: result.title,
            content: result.content,
            author: result.author,
        },
    });
}));
const updateBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const blogId = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.blogId;
    const payload = req === null || req === void 0 ? void 0 : req.body;
    const userID = (_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b.userID;
    payload.author = userID;
    const result = yield blogs_service_1.blogService.updateBlog(blogId, userID, payload);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Blog updated successfully",
        statusCode: http_status_1.default.CREATED,
        data: {
            _id: result === null || result === void 0 ? void 0 : result._id,
            title: result === null || result === void 0 ? void 0 : result.title,
            content: result === null || result === void 0 ? void 0 : result.content,
            author: result === null || result === void 0 ? void 0 : result.author,
        },
    });
}));
const getAllBlogs = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blogs_service_1.blogService.getAllBlogs(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Blogs fetched successfully",
        data: result,
    });
}));
const getSingleBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogId = req.params.blogId;
    const result = yield blogs_service_1.blogService.getSingleBlog(blogId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Blog is Retrived succesfully",
        data: result,
    });
}));
const deleteBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const blogId = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.blogId;
    const userID = (_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b.userID;
    const result = yield blogs_service_1.blogService.deleteBlog(blogId, userID);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Blog deleted successfully",
        statusCode: http_status_1.default.OK,
        data: {},
    });
}));
exports.blogController = {
    createBlog,
    updateBlog,
    getAllBlogs,
    getSingleBlog,
    deleteBlog,
};
