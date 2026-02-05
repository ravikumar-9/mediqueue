import type { NextFunction, Request, Response } from "express";

export const roleMiddleware =
  ({ allowedRoles }: { allowedRoles: string[] }) =>
  (req: Request, res: Response, next: NextFunction) => {
    const user = req?.user;
    const { role } = user;
    if (!allowedRoles?.includes(role)) {
      return res.status(403).json({ message: "access denied" });
    }
    next();
  };
