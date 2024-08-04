import { Pool, neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "./prisma-client";

neonConfig.webSocketConstructor = WebSocket;

const pool = new Pool({ connectionString: Bun.env.DATABASE_URL });
const adapter = new PrismaNeon(pool);
export const prisma = new PrismaClient({ adapter });
export * from "./prisma-client";
