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
    async ({ headers, cookie, query, redirect, error }) => {
      console.log(headers.referer);

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
        httpOnly: true,
        maxAge: 86400,
        sameSite: "lax",
      });

      return redirect(query.return);

      // return error(
      //   400,
      //   "It looks like bypass. We understand that ads can be annoying, but your few clicks will help a lot. Also, your session will be saved, so you won't need to complete this link again for the next 24 hours.",
      // );
    },
    {
      query: t.Object({
        return: t.String(),
      }),
    },
  );
