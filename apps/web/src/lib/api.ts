import { treaty } from "@elysiajs/eden";
import type { App } from "@esohasl/server";

export const api = treaty<App>(process.env.NEXT_PUBLIC_API);
