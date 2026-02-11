import dotenv from "dotenv"
import express from "express"
import { db } from "./config/db.js";
import { sql } from "drizzle-orm";
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import doctorRoutes from "./routes/doctorRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js"
import cors from "cors"
import cookieParser from "cookie-parser"

const app=express();

dotenv.config();

async function checkDBConnection() {
    try {
      await db.execute(sql`SELECT 1`);
      console.log("✅ Database connected successfully");
    } catch (error) {
      console.error("❌ Database connection failed");
      console.error(error);
    }
  }
  
checkDBConnection();

app.use(express.json()); 
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);


app.use("/auth",authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/doctors",doctorRoutes);
app.use("/api/appointments",appointmentRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})
