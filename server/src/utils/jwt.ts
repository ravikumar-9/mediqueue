import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface payload {
  id: string | undefined;
  role: "user" | "admin" | "superadmin" | undefined;
}

export const generateAccessToken = (payload: payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "1h" });
};
