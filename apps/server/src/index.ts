import cors from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { api as v1 } from "./v1";

export const app = new Elysia()
  .use((app) => {
    if (Bun.env.NODE_ENV !== "production") return app.use(swagger());

    return app;
  })
  .use(cors())
  .use(v1)
  .listen(3000);

export type App = typeof app;
