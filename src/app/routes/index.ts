import express from "express";
import { AuthRouter } from "../modules/auth/auth.route";

const router = express.Router();
const moduleRoutes = [
  {
    path: "/auth",
    endPoint: AuthRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.endPoint));
export const rootRouter = router;
