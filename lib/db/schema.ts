import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const enrollments = pgTable("enrollments", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  userEmail: text("user_email").notNull(),
  userName: text("user_name"),
  programName: text("program_name").notNull(),
  enrolledAt: timestamp("enrolled_at").defaultNow().notNull(),
});
