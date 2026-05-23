import express from "express";
import { IssuesController } from "./issues.controller";
import auth from "../../middlewares/auth";
import { CONTRIBUTOR, MAINTAINER } from "../../../constant/common";
const router = express.Router();

router.post("/", auth(CONTRIBUTOR, MAINTAINER), IssuesController.createIssues);
router.get("/", IssuesController.getAllIssues);
router.get("/:id", IssuesController.getIssueById);

export const IssuesRouter = router;
