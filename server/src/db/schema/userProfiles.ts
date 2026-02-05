// db/schema/userProfiles.ts
import { pgTable, uuid, varchar, date } from "drizzle-orm/pg-core";
import { users } from "./users.js";


export const userProfiles = pgTable("user_profiles", {
 id:uuid().defaultRandom().primaryKey(),
 userId:uuid("user_id")?.references(()=>users?.id,{onDelete:"cascade"}).unique().notNull(),
 firstName:varchar("first_name",{length:100}).notNull(),
 lastName:varchar("last_name",{length:100}).notNull(),
 gender:varchar("gender",{length:10}).$type<"Male" | "Female" | "Other">().notNull(),
 phone:varchar("phone",{length:13}).notNull(),
 dateOfBirth:date("date_of_birth").notNull()
});
