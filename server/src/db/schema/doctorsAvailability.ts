import { pgTable, time, uuid, varchar } from "drizzle-orm/pg-core";
import { doctorProfiles } from "./doctorProfiles.js";

export const doctorsAvailability=pgTable("doctors_availability",{
    id:uuid("id").defaultRandom().primaryKey(),
    doctorId:uuid("doctor_id").references(()=>doctorProfiles?.id,{onDelete:"cascade"}).notNull(),
    day:varchar("day").$type<"Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday">().notNull(),
    startTime:time("start_time").notNull(),
    endTime:time("end_time").notNull(),
    createdAt:time("created_at",{withTimezone:true}).defaultNow().notNull(),
    updatedAt:time("updated_at",{withTimezone:true}).defaultNow().notNull()
})