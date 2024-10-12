import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { migrate } from "drizzle-orm/libsql/migrator";
import * as schema from "./schema";

const client = createClient({
  url: "file:embedded-replica.db",
  syncUrl: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
  syncInterval: 30,
});

export const db = drizzle(client, { schema });
await migrate(db, { migrationsFolder: `${__dirname}/../drizzle` });

export * from "drizzle-orm";
export * from "./schema";
