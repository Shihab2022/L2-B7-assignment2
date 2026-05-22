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
};
