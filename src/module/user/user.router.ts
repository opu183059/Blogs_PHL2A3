import { Router } from "express";
import { userController } from "./user.controller";
import { UserValidation } from "./user.validation";
import validateRequest from "../../middlewares/validateRequest";

const userRouter = Router();

userRouter.post(
  "/register",
  validateRequest(UserValidation.userValidationSchema),
  userController.registerUser
);
userRouter.get("/users", userController.getUser);
userRouter.get("/users/:userId", userController.getSingleUser);

export default userRouter;
