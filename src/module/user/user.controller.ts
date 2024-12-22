import { Request, Response } from "express";
import { userService } from "./user.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await userService.createUser(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is created succesfully",
    data: result,
  });
});

const getUser = catchAsync(async (req, res) => {
  const result = await userService.getUser();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is Retrived succesfully",
    data: result,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const userId = req.params.userId;

  const result = await userService.getSingleUser(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Data of "${result?.name}" is Retrived succesfully`,
    data: result,
  });
});

export const userController = {
  createUser,
  getUser,
  getSingleUser,
};
