import { pool } from "../../../db";
import AppError from "../../errors/ApiError";
import { SIGN_UP_USER_PAYLOAD } from "../../types";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import config from "../../config";
import { CONTRIBUTOR } from "../../../constant/common";
import { generateJwtToken } from "../../../utils/jwtHelper";
import { Secret, SignOptions } from "jsonwebtoken";

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
  const existingUser = await pool.query(
    `SELECT * FROM users WHERE email = $1`,
    [payload.email],
  );
  if (existingUser.rows.length === 0) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid email or password");
  }
  const isPasswordCorrect = await bcrypt.compare(
    payload.password,
    existingUser.rows[0].password,
  );
  if (!isPasswordCorrect) {
    throw new Error("Password is not correct!");
  }
  const userInfo = existingUser.rows[0];
  const tokenData = {
    name: userInfo.name,
    id: userInfo?.id,
    role: userInfo.role,
  };
  const accessToken = generateJwtToken(
    tokenData,
    config.jwt_access_secret as Secret,
    config.jwt_access_expire_in as SignOptions["expiresIn"],
  );

  return {
    token: accessToken,
    user: {
      id: userInfo.id,
      name: userInfo.name,
      email: userInfo.email,
      role: userInfo.role,
      created_at: userInfo.created_at,
      updated_at: userInfo.updated_at,
    },
  };
};
export const AuthServices = {
  loginUser,
  signUpUser,
};
