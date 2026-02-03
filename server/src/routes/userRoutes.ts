import express from "express";
import { Login } from "../middlewares/loginmiddleware.js";
import { deactivateUser, getAllUsers } from "../controllers/userController.js";

const router=express.Router();

router.post("/users",Login,getAllUsers);
router.put("/users/update-status/:id",Login,deactivateUser);

export default router;
