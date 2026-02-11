import type { Request, Response } from "express";
import { db } from "../config/db.js";
import { users } from "../db/schema/users.js";
import { eq } from "drizzle-orm";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";
import { comparePassword, hashPassword } from "../utils/hash.js";
import { generateAccessToken } from "../utils/jwt.js";
import { userProfiles } from "../db/schema/userProfiles.js";

export const Register = async (req: Request, res: Response) => {
  try {
    const result = registerSchema.safeParse(req.body);
    if (!result?.success) {
      return res.status(400).json({
        message: "all fields are required",
        data: result?.error?.issues,
      });
    }
    const { firstName, lastName, email, gender, password, dateOfBirth, phone } =
      req.body;
    const isUserExist = await db
      .select()
      .from(users)
      .where(eq(users.email, email));
    if (isUserExist?.length > 0) {
      return res
        .status(400)
        .json({ message: "User already exists with this email." });
    }
    const hashedPassword = await hashPassword(password);
    const queryResult = await db.transaction(async (tx) => {
      const [newUser] = await tx
        .insert(users)
        .values({ email, password: hashedPassword, role: "user" })
        .returning({ id: users?.id, email: users?.email, role: users?.role });
      if (!newUser?.id) {
        return res
          .status(400)
          .json({
            status: false,
            message: "An error occured while registering",
          });
      }
      await tx
        .insert(userProfiles)
        .values({
          firstName,
          lastName,
          userId: newUser?.id,
          gender,
          phone,
          dateOfBirth,
        });
      return newUser;
    });

    return res.status(201).json({
      message: "User registered successfully",
      data: { user: queryResult },
    });
  } catch (error) {
    console.log(error);
    res.json({ statusCode: 500 });
  }
};

export const Login = async (req: Request, res: Response) => {
  try {
    const schemaValidate = loginSchema.safeParse(req.body);
    if (!schemaValidate?.success) {
      return res
        .status(400)
        .json({ status: false, message: schemaValidate?.error?.issues });
    }

    const { email, password } = req.body;

    const isUserExist = await db
      .select()
      .from(users)
      .where(eq(users?.email, email));

    if (isUserExist?.length > 0 && isUserExist[0]?.password) {
      const isPasswordCorrect = await comparePassword(
        password,
        isUserExist[0]?.password
      );

      if (!isPasswordCorrect) {
        return res
          .status(400)
          .json({ status: false, message: "Invalid credentials" });
      }

      if (!isUserExist[0]){
        return res
        .status(400)
        .json({ status: false, message: "Invalid credentials" });
      }

      const token = generateAccessToken({
        id: isUserExist[0]?.id,
        role: isUserExist[0]?.role,
      });

      res.cookie("access_token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 180 * 60 * 1000,
      });

      return res.status(200).json({
        status: true,
        message: "login successfull",
        data: { role: isUserExist[0]?.role },
      });
    } else {
      return res
        .status(400)
        .json({ status: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occured while login." });
  }
};
