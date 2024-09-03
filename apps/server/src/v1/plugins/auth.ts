import { Elysia, t } from "elysia";
import { verifyRequestOrigin } from "lucia";
import { lucia } from "../lib/lucia";

export const auth = new Elysia()
  .guard({
    as: "scoped",
    cookie: t.Cookie({
      "esohasl.auth": t.String(),
    }),
  })
  .resolve({ as: "scoped" }, async ({ request, error, cookie }) => {
    if (request.method !== "GET") {
      const origin = request.headers.get("Origin");

      if (!origin || !verifyRequestOrigin(origin, [Bun.env.HOME_URL]))
        throw error(403);
    }

    const { session, user } = await lucia.validateSession(
      cookie["esohasl.auth"].value,
    );

    if (!user) throw error(401);

    if (session?.fresh) {
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookie[sessionCookie.name].set({
        value: sessionCookie.value,
        ...sessionCookie.attributes,
      });
    }
    if (!session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookie[sessionCookie.name].set({
        value: sessionCookie.value,
        ...sessionCookie.attributes,
      });
    }

    return {
      user,
      session,
    };
  });
