import { Router } from "express";
import { userController } from "./user.controller";

const userRouter = Router();

userRouter.get("/users", userController.getUser);
userRouter.get("/users/:userId", userController.getSingleUser);

export default userRouter;
