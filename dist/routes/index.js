"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = __importDefault(require("../module/user/user.route"));
const blogs_route_1 = __importDefault(require("../module/blogs/blogs.route"));
const auth_route_1 = __importDefault(require("../module/auth/auth.route"));
const admin_route_1 = __importDefault(require("../module/admin/admin.route"));
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/user",
        route: user_route_1.default,
    },
    {
        path: "/auth",
        route: auth_route_1.default,
    },
    {
        path: "/blogs",
        route: blogs_route_1.default,
    },
    {
        path: "/admin",
        route: admin_route_1.default,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
