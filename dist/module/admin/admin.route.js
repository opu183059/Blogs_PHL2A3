"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const admin_controller_1 = require("./admin.controller");
const adminRouter = (0, express_1.Router)();
// block user as admin
adminRouter.patch("/users/:userId/block", (0, auth_1.default)("admin"), admin_controller_1.adminController.updateUser);
// delete blog as admin
adminRouter.delete("/blogs/:blogId", (0, auth_1.default)("admin"), admin_controller_1.adminController.deleteBlog);
exports.default = adminRouter;
