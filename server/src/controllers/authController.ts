import type { Request, Response } from "express";
import { db } from "../config/db.js";
import { users } from "../db/schema/users.js";
import { eq } from "drizzle-orm";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";
import { comparePassword, hashPassword } from "../utils/hash.js";
import jwt from "jsonwebtoken";

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
    const hashedPassword=await hashPassword(password)
    const queryResult = await db
      .insert(users)
      .values({
        firstName,
        lastName,
        email,
        password:hashedPassword,
        gender,
        dateOfBirth,
        phone,
      })
      .returning();
    if (queryResult[0]) {
      return res.status(200).json({
        status: true,
        data: queryResult[0],
        message: "User registered successfully.",
      });
    }
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
    if (isUserExist?.length > 0) {

      const isPasswordCorrect =await comparePassword(
        password,
        isUserExist[0]?.password
      );

      if (!isPasswordCorrect) {
        return res
          .status(400)
          .json({ status: false, message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { id: isUserExist[0]?.id, role: isUserExist[0]?.role },
        "kdsajfisdfisdkjfnmdsjfid",
        { expiresIn: "1h" }
      );
      
      return res
        .status(200)
        .json({ status: true, message: "login successfull", data: { token } });
    } else {
      return res
        .status(400)
        .json({ status: false, message: "Invalid credentials" });
    }
  } catch (error) {
    return res.status(500).json({ message: "An error occured while login." });
  }
};
