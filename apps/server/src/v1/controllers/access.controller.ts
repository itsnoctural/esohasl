import { access, db, eq } from "@esohasl/db";
import { Elysia, t } from "elysia";
import { customAlphabet } from "nanoid";

const alphabet = "0123456789abcdefghijklmnopqrstuvwxyz";
const nanoid = customAlphabet(alphabet, 24);

export const AccessController = new Elysia({ prefix: "/access" })
  .get(
    "/status",
    async ({ query, error }) => {
      const record = await db
        .select()
        .from(access)
        .where(eq(access.id, query.id));

      if (record.length > 0) {
        if (record[0].expiresAt >= new Date()) return record[0];

        await db.delete(access).where(eq(access.id, query.id));
      }

      return error(404);
    },
    {
      query: t.Object({
        id: t.String(),
      }),
    },
  )
  .get(
    "/",
    async ({ cookie, redirect }) => {
      const accessValue = await db
        .insert(access)
        .values({
          id: nanoid(),
          expiresAt: new Date(Date.now() + 8.64e7),
        })
        .returning();

      cookie["esohasl.access"].set({
        value: accessValue[0].id,
        path: "/",
        secure: Bun.env.NODE_ENV === "production",
        domain:
          Bun.env.NODE_ENV === "production" ? Bun.env.AUTH_DOMAIN : "localhost",
        httpOnly: true,
        maxAge: 86400,
        sameSite: "lax",
      });

      return redirect(cookie["esohasl.return"].value);
    },
    {
      cookie: t.Cookie({
        "esohasl.return": t.String(),
      }),
    },
  );
