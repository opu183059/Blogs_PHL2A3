import { Router } from "express";
import userRouter from "../module/user/user.route";
import blogRouter from "../module/blogs/blogs.route";
import authRouter from "../module/auth/auth.route";
import adminRouter from "../module/admin/admin.route";

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
  {
    path: "/admin",
    route: adminRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
