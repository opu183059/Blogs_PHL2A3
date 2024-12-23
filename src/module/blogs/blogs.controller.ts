import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { blogService } from "./blogs.service";
import { title } from "process";
import { IAuthorInfo } from "./blogs.interface";

const createBlog = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  payload.author = req.user.userID;
  const result = await blogService.createBlog(payload);

  sendResponse(res, {
    success: true,
    message: "Blog created successfully",
    statusCode: httpStatus.CREATED,
    data: {
      _id: result._id,
      title: result.title,
      content: result.content,
      author: result.author,
    },
  });
});

const getAllBlogs = catchAsync(async (req, res) => {
  const result = await blogService.getAllBlogs(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blogs Retrived succesfully",
    data: result,
  });
});

const getSingleBlog = catchAsync(async (req, res) => {
  const blogId = req.params.blogId;

  const result = await blogService.getSingleBlog(blogId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog is Retrived succesfully",
    data: result,
  });
});

export const blogController = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
};
