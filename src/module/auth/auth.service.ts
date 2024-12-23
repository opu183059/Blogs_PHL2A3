import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { User } from "../user/user.model";
import { ILoginUser } from "./auth.interface";
import jwt from "jsonwebtoken";

const loginUser = async (payload: ILoginUser) => {
  const user = await User.findOne({ email: payload?.email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found.");
  }

  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is deleted.");
  }

  const userStatus = user?.isBlocked;
  if (userStatus === true) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is blocked.");
  }

  //creating token
  const jwtPayload = {
    userEmail: user.email,
    userRole: user.role,
  };

  const token = jwt.sign(jwtPayload, "Bangladesh2.0", { expiresIn: "7d" });

  return { token, user };
};

export const AuthServices = {
  loginUser,
};
