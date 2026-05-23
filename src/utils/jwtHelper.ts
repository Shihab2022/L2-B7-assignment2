import jwt, { JwtPayload, Secret, SignOptions } from "jsonwebtoken";

export const generateJwtToken = (
  payload: any,
  secret: Secret,
  expiresIn: SignOptions["expiresIn"],
) => {
  const token = jwt.sign(payload, secret, { expiresIn });
  return token;
};

export const jwtVerify = (token: string, secret: Secret) => {
  return jwt.verify(token, secret) as JwtPayload;
};
