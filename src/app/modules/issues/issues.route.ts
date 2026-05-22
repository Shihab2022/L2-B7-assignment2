import express from "express";
import { IssuesController } from "./issues.controller";
const router = express.Router();

router.post("/login", IssuesController.createIssues);

export const IssuesRouter = router;
