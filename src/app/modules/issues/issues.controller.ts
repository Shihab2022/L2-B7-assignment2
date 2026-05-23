import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import httpStatus from "http-status";
import { IssuesServices } from "./issues.service";

const createIssues = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const result = await IssuesServices.createIssues(req.body, req.user);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Issues created successfully",
      data: result,
    });
  },
);
const getIssueById = catchAsync(async (req: Request, res: Response) => {
  const result = await IssuesServices.getIssueById("1");
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Issue retrieved successfully",
    data: result,
  });
});

export const IssuesController = {
  createIssues,
  getIssueById,
};
