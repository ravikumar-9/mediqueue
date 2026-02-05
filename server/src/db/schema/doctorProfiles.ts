import { pgTable, uuid, varchar} from "drizzle-orm/pg-core";
import { users } from "./users.js";


export const doctorProfiles=pgTable("doctor_profiles",{
    id:uuid().defaultRandom().primaryKey(),
    userId:uuid("user_id").references(()=>users?.id,{onDelete:"cascade"}).unique().notNull(),
    firstName:varchar("first_name",{length:100}).notNull(),
    lastName:varchar("last_name",{length:100}).notNull(),
    experience:varchar("experience",{length:2}).notNull(),
    specialization:varchar("specialization",{length:100}).notNull(),
    phone:varchar("phone",{length:13}).notNull(),
})