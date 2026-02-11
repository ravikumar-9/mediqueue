import express from "express"
import { loginMiddleware } from "../middlewares/loginmiddleware.js";
import { roleMiddleware } from "../middlewares/rolemiddleware.js";
import { createDoctor, doctorsList, getDoctorDetails, updateDoctorDetails, updateDoctorStatus } from "../controllers/doctorController.js";

const router=express.Router();

router.post("/create",loginMiddleware,roleMiddleware({allowedRoles:["superadmin"]}),createDoctor);
router.post("/",loginMiddleware,roleMiddleware({allowedRoles:["superadmin"]}),doctorsList);
router.get("/profile/:id",loginMiddleware,roleMiddleware({allowedRoles:["superadmin"]}),getDoctorDetails);
router.put("/update/:id",loginMiddleware,roleMiddleware({allowedRoles:["superadmin"]}),updateDoctorDetails);
router.put("/update-status/:id",loginMiddleware,roleMiddleware({allowedRoles:["superadmin"]}),updateDoctorStatus);

export default router;