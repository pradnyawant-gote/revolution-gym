import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const enrollments = sqliteTable('enrollments', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('user_id').notNull(),
  userEmail: text('user_email'),
  userName: text('user_name'),
  programName: text('program_name').notNull(),
  enrolledAt: integer('enrolled_at', { mode: 'timestamp' }).notNull(),
});
