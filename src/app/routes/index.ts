import express from "express";
import { AuthRouter } from "../modules/auth/auth.route";
import { IssuesRouter } from "../modules/issues/issues.route";

const router = express.Router();
const moduleRoutes = [
  {
    path: "/auth",
    endPoint: AuthRouter,
  },
  {
    path: "/issues",
    endPoint: IssuesRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.endPoint));
export const rootRouter = router;
