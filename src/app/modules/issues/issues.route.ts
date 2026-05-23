import express from "express";
import { IssuesController } from "./issues.controller";
import auth from "../../middlewares/auth";
const router = express.Router();

router.post("/", auth(), IssuesController.createIssues);
router.get("/:id", IssuesController.getIssueById);

export const IssuesRouter = router;
