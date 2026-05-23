import { pool } from "../../../db";
import AppError from "../../errors/ApiError";
import { SIGN_UP_USER_PAYLOAD } from "../../types";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import config from "../../config";
import { CONTRIBUTOR } from "../../../constant/common";

const signUpUser = async (payload: SIGN_UP_USER_PAYLOAD) => {
  const { email, password, role = CONTRIBUTOR, name } = payload;
  if (!name || !email || !password) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Name, email and password are required",
    );
  }

  // if (password.length < passwordMinLength) {
  //   throw new AppError(
  //     httpStatus.BAD_REQUEST,
  //     "Password must be at least 6 characters long",
  //   );
  // }

  // 🔹 Check existing user
  const existingUser = await pool.query(
    `SELECT id FROM users WHERE email = $1`,
    [email],
  );
  if (existingUser.rows.length > 0) {
    throw new AppError(httpStatus.BAD_REQUEST, "Email already exists");
  }

  // 🔥 Hash password (replacement of mongoose pre-save)
  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds),
  );

  // 🔹 Insert user
  const insertQuery = `
    INSERT INTO users (name, email, password, role)
    VALUES ($1, $2, $3, $4)
    RETURNING id, name, email,role,created_at,updated_at
  `;

  const result = await pool.query(insertQuery, [
    name,
    email,
    hashedPassword,
    role,
  ]);

  const createdUser = result.rows[0];
  return createdUser;
};
const loginUser = async (payload: { email: string; password: string }) => {
  //   const isUserExit = await prisma.user.findUniqueOrThrow({
  //     where: {
  //       email: payload.email,
  //     },
  //   });
  //   const isPasswordCorrect = await bcrypt.compare(
  //     payload.password,
  //     isUserExit.password
  //   );
  //   if (!isPasswordCorrect) {
  //     throw new Error("Password is not correct!");
  //   }
  //   const tokenData = {
  //     email: isUserExit.email,
  //     userId: isUserExit?.id,
  //     role: isUserExit.role,
  //   };
  //   const accessToken = generateJwtToken(
  //     tokenData,
  //     config.jwt_access_secret as Secret,
  //     config.jwt_access_expire_in as string
  //   );
  //   const refreshToken = generateJwtToken(
  //     tokenData,
  //     config.jwt_refresh_secret as Secret,
  //     config.jwt_refresh_expire_in as string
  //   );
  //   return {
  //     accessToken,
  //     refreshToken,
  //     needPasswordChange: isUserExit.needPasswordChange,
  //   };
};
export const AuthServices = {
  loginUser,
  signUpUser,
};
