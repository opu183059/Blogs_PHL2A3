import { Router } from "express";
import userRouter from "../module/user/user.router";

const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: userRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
