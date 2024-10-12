import { relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const user = sqliteTable("user", {
  id: integer().primaryKey({ autoIncrement: true }),
  username: text().notNull().unique(),

  provider: text().notNull(),
  providerId: text("provider_id").notNull().unique(),

  updatedNameAt: integer("updated_name_at", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export const script = sqliteTable("script", {
  id: text().primaryKey(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),

  title: text().notNull(),
  gameName: text("game_name").notNull(),
  description: text(),
  script: text().notNull(),

  gameId: text("game_id").notNull(),
  views: integer().notNull().default(0),

  userId: integer("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
});

export const session = sqliteTable("session", {
  id: text().primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
  expiresAt: integer("expires_at").notNull(),
});

export const userRelations = relations(user, ({ many }) => ({
  scripts: many(script),
  sessions: many(session),
}));

export const access = sqliteTable("access", {
  id: text().primaryKey(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
});
