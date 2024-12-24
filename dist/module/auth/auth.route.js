"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_validation_1 = require("./auth.validation");
const auth_controller_1 = require("./auth.controller");
const user_validation_1 = require("../user/user.validation");
const user_controller_1 = require("../user/user.controller");
const authRouter = (0, express_1.Router)();
// login route
authRouter.post("/login", (0, validateRequest_1.default)(auth_validation_1.AuthValidation.loginValidationSchema), auth_controller_1.AuthController.loginUser);
// register route
authRouter.post("/register", (0, validateRequest_1.default)(user_validation_1.UserValidation.userValidationSchema), user_controller_1.userController.registerUser);
exports.default = authRouter;
