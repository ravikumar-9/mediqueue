import express from "express";
import { loginMiddleware } from "../middlewares/loginmiddleware.js";
import {
  deactivateUser,
  getAllUsers,
  getUserById,
} from "../controllers/userController.js";
import { roleMiddleware } from "../middlewares/rolemiddleware.js";

const router = express.Router();

router.post(
  "/",
  loginMiddleware,
  roleMiddleware({ allowedRoles: ["admin", "superadmin"] }),
  getAllUsers
);
router.get(
  "/details/:id",
  loginMiddleware,
  roleMiddleware({ allowedRoles: ["superadmin", "doctor"] }),
  getUserById
);
router.put(
  "/update-status/:id",
  loginMiddleware,
  roleMiddleware({ allowedRoles: ["admin", "superadmin"] }),
  deactivateUser
);

export default router;
