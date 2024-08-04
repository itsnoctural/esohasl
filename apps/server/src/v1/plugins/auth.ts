import { Elysia, t } from "elysia";
import { verifyRequestOrigin } from "lucia";
import { lucia } from "../lib/lucia";

export const auth = new Elysia()
  .guard({
    cookie: t.Cookie({
      "esohasl.auth": t.String(), // BUG: .guard doesn't work with cookie since 1.1.0
    }),
  })
  .resolve({ as: "scoped" }, async ({ request, error, cookie }) => {
    if (request.method !== "GET") {
      const origin = request.headers.get("Origin");
      const host = request.headers.get("Host"); // TODO: change to x-forwarded-host or (vercel ip client?)

      if (!origin || !host || verifyRequestOrigin(origin, [host]))
        throw error(403);
    }

    // TODO: remove after fix .guard
    if (!cookie["esohasl.auth"].value) throw error(422);

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
