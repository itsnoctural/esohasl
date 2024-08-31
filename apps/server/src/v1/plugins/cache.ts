import { redis } from "@esohasl/redis";
import { ELYSIA_RESPONSE, Elysia } from "elysia";

export const cache = new Elysia()
  .onRequest(async ({ request }) => {
    if (request.method === "GET") {
      const url = new URL(request.url);
      const cache = await redis.get(url.pathname + url.search);

      if (cache) return JSON.parse(cache as string);
    }
  })
  .onAfterHandle({ as: "scoped" }, async ({ request, response }) => {
    if (request.method === "GET" && typeof response === "object") {
      if (ELYSIA_RESPONSE in response) {
        return response;
      }

      const url = new URL(request.url);
      await redis.set(url.pathname + url.search, JSON.stringify(response), {
        EX: 60,
      });
    }
  });
