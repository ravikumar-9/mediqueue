import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  date,
  boolean
} from "drizzle-orm/pg-core"

/* ================= USERS TABLE ================= */

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),

  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),

  email: varchar("email", { length: 150 })
    .notNull()
    .unique(),

  gender: varchar("gender", { length: 10 })
    .$type<"male" | "female" | "other">()
    .notNull(),

  phone:varchar("phone",{length:13}).notNull(),
  password: varchar("password", { length: 255 }).notNull(),

  role: varchar("role", { length: 20 })
    .$type<"user" | "admin" | "superadmin">()
    .default("user")
    .notNull(),

  dateOfBirth: date("date_of_birth").notNull(),

  isDeactivated:boolean("isDeactivated").default(false),

  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
})
