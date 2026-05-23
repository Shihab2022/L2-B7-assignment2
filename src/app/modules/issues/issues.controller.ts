import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import httpStatus from "http-status";
import { IssuesServices } from "./issues.service";

const createIssues = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const result = await IssuesServices.createIssues(req.body, req.user);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Issues created successfully",
      data: result,
    });
  },
);
const getAllIssues = catchAsync(async (req: Request, res: Response) => {
  const result = await IssuesServices.getAllIssues(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  });
});
const getIssueById = catchAsync(async (req: Request, res: Response) => {
  const issueId = req.params.id;
  const result = await IssuesServices.getIssueById(issueId as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  });
});

export const IssuesController = {
  createIssues,
  getIssueById,
  getAllIssues,
};
