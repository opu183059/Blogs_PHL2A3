import { Router } from "express";
import userRouter from "../module/user/user.route";
import blogRouter from "../module/blogs/blog.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: userRouter,
  },
  {
    path: "/blogs",
    route: blogRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
