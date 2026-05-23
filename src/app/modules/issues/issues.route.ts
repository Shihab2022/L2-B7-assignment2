import express from "express";
import { IssuesController } from "./issues.controller";
import auth from "../../middlewares/auth";
import { CONTRIBUTOR, MAINTAINER } from "../../../constant/common";
const router = express.Router();

router.post("/", auth(CONTRIBUTOR, MAINTAINER), IssuesController.createIssues);
router.get("/", IssuesController.getAllIssues);
router.get("/:id", IssuesController.getIssueById);
router.patch(
  "/:id",
  auth(CONTRIBUTOR, MAINTAINER),
  IssuesController.updateIssueById,
);
router.delete("/:id", auth(MAINTAINER), IssuesController.deleteIssueById);

export const IssuesRouter = router;
