import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import httpStatus from "http-status";
import { IssuesServices } from "./issues.service";

const createIssues = catchAsync(async (req: Request, res: Response) => {
  const result = await IssuesServices.createIssues(req.body);
  //   const { refreshToken, accessToken, needPasswordChange } = result;
  //   res.cookie("refreshToken", refreshToken, {
  //     secure: true,
  //     httpOnly: true,
  //     sameSite: "strict",
  //     maxAge: 90 * 24 * 60 * 60 * 1000,
  //   });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Issues created successfully",
    data: {},
  });
});

export const IssuesController = {
  createIssues,
};
