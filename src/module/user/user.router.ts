import { Router } from "express";
import { userController } from "./user.controller";
import { UserValidation } from "./user.validation";
import validateRequest from "../../middlewares/validateRequest";

const userRouter = Router();

userRouter.post(
  "/",
  validateRequest(UserValidation.userValidationSchema),
  userController.createUser
);
userRouter.get("/", userController.getUser);
userRouter.get("/:userId", userController.getSingleUser);

export default userRouter;
