import type { Request, Response } from "express";
import { users } from "../db/schema/users.js";
import { db } from "../config/db.js";
import { desc, eq } from "drizzle-orm";

//get all users
export const getAllUsers = async (req: Request, res: Response) => {
  const { skip, limit } = req.body;
  try {
    const usersList = await db
      .select({
        id: users?.id,
        firstName: users?.firstName,
        lastName: users?.lastName,
        email: users?.email,
        phone: users?.phone,
        isDeactivated: users?.isDeactivated,
        createdAt: users?.createdAt,
      })
      .from(users)
      .offset(skip ?? 0)
      .limit(limit ?? 10)
      .orderBy(desc(users?.createdAt));
    res.status(200).json({
      message: "users feched successfully",
      data: usersList,
      status: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//deactivate user
export const deactivateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req?.params;
    if (!id) {
      return res.status(400).json({ message: "User not found." });
    }
    const user = await db.select().from(users).where(eq(users?.id, id));
    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }
    const result = await db
      .update(users)
      .set({ isDeactivated: !user[0]?.isDeactivated })
      .where(eq(users?.id, id))
      .returning();
    return res
      .status(200)
      .json({ message: `user status updated successfully`, status: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
