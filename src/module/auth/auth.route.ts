import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidation } from "./auth.validation";
import { AuthController } from "./auth.controller";
import { UserValidation } from "../user/user.validation";
import { userController } from "../user/user.controller";

const authRouter = Router();

authRouter.post(
  "/login",
  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.loginUser
);

authRouter.post(
  "/register",
  validateRequest(UserValidation.userValidationSchema),
  userController.registerUser
);

export default authRouter;
