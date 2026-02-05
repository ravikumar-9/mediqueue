import jwt, { type JwtPayload } from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import { db } from "../config/db.js";
import { users } from "../db/schema/users.js";
import { eq } from "drizzle-orm";

export const loginMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.cookies;
  const token = authHeader?.access_token;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    const isUserExist = await db
      .select()
      .from(users)
      .where(eq(users?.id, payload?.id));
    if (isUserExist?.length > 0) {
      const user = isUserExist[0];
      console.log(user)
      if (user?.isDeactivated) {
        return res
          .status(403)
          .json({ message: "Your account has been deactivated." });
      } else {
        req.user = payload;
        next();
      }
    }
  } catch (err: any) {
    console.log(err)
    if (err.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Session Expired. Please login to" });
    }

    return res
      .status(401)
      .json({ message: "Session Expired. Please login to continue" });
  }
};
