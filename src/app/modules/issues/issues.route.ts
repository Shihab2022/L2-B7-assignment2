import express from "express";
import { IssuesController } from "./issues.controller";
const router = express.Router();

router.post("/", IssuesController.createIssues);
router.get("/:id", IssuesController.getIssueById);

export const IssuesRouter = router;
