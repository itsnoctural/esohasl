import { relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const user = sqliteTable("user", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  username: text("username").notNull().unique(),

  provider: text("provider").notNull(),
  providerId: text("provider_id").notNull().unique(),

  updatedNameAt: integer("updated_name_at", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export const script = sqliteTable("script", {
  id: text("id").primaryKey(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),

  title: text("title").notNull(),
  gameName: text("game_name").notNull(),
  description: text("description"),
  script: text("script").notNull(),

  gameId: text("game_id").notNull(),
  views: integer("views").notNull().default(0),

  userId: integer("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
});

export const session = sqliteTable("session", {
  id: text("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
  expiresAt: integer("expires_at").notNull(),
});

export const userRelations = relations(user, ({ many }) => ({
  scripts: many(script),
  sessions: many(session),
}));
