import { Request, Response } from "express";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const result = await userService.createUser(payload);
    res.json({
      message: "User created successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    res.json({
      message: "User Creation failed",
      success: false,
      error,
    });
  }
};

export const userController = {
  createUser,
};
