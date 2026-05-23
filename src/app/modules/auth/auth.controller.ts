import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import httpStatus from "http-status";
import { AuthServices } from "./auth.service";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.loginUser(req.body);
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
    message: "Login successfully",
    data: result,
  });
});

const signUpUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.signUpUser(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

export const AuthController = {
  loginUser,
  signUpUser,
};
