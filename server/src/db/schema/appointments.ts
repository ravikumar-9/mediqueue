import { date, pgTable, time, timestamp, uuid, varchar} from "drizzle-orm/pg-core";
import { doctorProfiles } from "./doctorProfiles.js";
import { users } from "./users.js";

export const appointments=pgTable("appointments",{
    id:uuid("id").defaultRandom().primaryKey().notNull(),
    doctorId:uuid("doctor_id").references(()=>doctorProfiles?.id).notNull(),
    userId:uuid("user_id").references(()=>users?.id).notNull(),
    appointmentDate:date("appointment_date").notNull(),
    startTime:time("start_time").notNull(),
    endTime:time("end_time")?.notNull(),
    status:varchar("status").$type<"Pending" | "Booked" | "Completed" | "Cancelled">().default("Pending").notNull(),
    createdAt:timestamp("created_at",{withTimezone:true}).defaultNow().notNull(),
    updatedAt:timestamp("updated_at",{withTimezone:true}).$onUpdate(()=>new Date()).notNull()
})