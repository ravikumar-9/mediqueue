import express from "express";
import { loginMiddleware } from "../middlewares/loginmiddleware.js";
import {
  appointmentsList,
  appointmentSlots,
  createAppointment,
} from "../controllers/appointmentcontroller.js";
import { roleMiddleware } from "../middlewares/rolemiddleware.js";

const router = express.Router();

router.get("/slots/:id", loginMiddleware, appointmentSlots);
router.post("/create", loginMiddleware, createAppointment);
router.get(
  "/",
  loginMiddleware,
  roleMiddleware({ allowedRoles: ["superadmin", "doctor", "user"] }),
  appointmentsList
);

export default router;
