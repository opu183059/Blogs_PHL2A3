"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const userRouter = (0, express_1.Router)();
// get all users as admin
userRouter.get("/", (0, auth_1.default)("admin"), user_controller_1.userController.getUser);
// get single user as admin
userRouter.get("/:userId", (0, auth_1.default)("admin"), user_controller_1.userController.getSingleUser);
exports.default = userRouter;
