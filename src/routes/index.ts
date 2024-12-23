import { Router } from "express";
import userRouter from "../module/user/user.route";
import blogRouter from "../module/blogs/blog.route";
import authRouter from "../module/auth/auth.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/user",
    route: userRouter,
  },
  {
    path: "/auth",
    route: authRouter,
  },
  {
    path: "/blogs",
    route: blogRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
