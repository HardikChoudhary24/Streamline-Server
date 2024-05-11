import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { JWTUser } from "../app/interfaces";

const JWT_SECRET = "shfks#&@*1223";

export const generateJWT = (user: User) => {
  const payload: JWTUser = {
    id: user.id,
    name: user.name,
    email: user.email,
  };
  const token = jwt.sign(payload, JWT_SECRET);
  return token;
};

export const decodeJWT =(token: string) => {
  try {
    const user = jwt.verify(token, JWT_SECRET);
    return user as JWTUser;
  } catch (error) {
    return error;
  }
};
