import cors from "@elysiajs/cors";
import { Elysia } from "elysia";
import { api as v1 } from "./v1";

const app = new Elysia()
  .use(cors())
  .use(v1)
  .get("/ping", () => {
    return { status: "pong", region: process.env.FLY_REGION };
  })
  .listen(3000);

export type App = typeof app;
