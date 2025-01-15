import { createClient } from "@libsql/client/http";
import { drizzle } from "drizzle-orm/libsql";
import { migrate } from "drizzle-orm/libsql/migrator";
import * as schema from "./schema";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export const db = drizzle(client, { schema });
await migrate(db, { migrationsFolder: "/app/drizzle" });

export * from "drizzle-orm";
export * from "./schema";
