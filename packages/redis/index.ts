import { createClient } from "@redis/client";

export const redis = await createClient({ url: Bun.env.REDIS_URL }).connect();
