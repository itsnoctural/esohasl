import {
  and,
  asc,
  count,
  db,
  desc,
  eq,
  ilike,
  not,
  or,
  script,
  sql,
} from "@esohasl/db";
import { Elysia, t } from "elysia";
import { customAlphabet } from "nanoid";
import { ScriptModels } from "../models/script.model";
import { auth } from "../plugins/auth";
import * as AWSS3Service from "../services/aws-s3.service";
import * as ScriptsService from "../services/scripts.service";

const alphabet =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const nanoid = customAlphabet(alphabet, 8);

export const ScriptsController = new Elysia({ prefix: "/scripts" })
  .use(ScriptModels)
  .get(
    "/categories",
    async ({ query }) => {
      const categories = await db
        .select({
          gameName: script.gameName,
          views: sql`count(${script.views})`,
        })
        .from(script)
        .orderBy(sql`views`)
        .limit(query.limit)
        .groupBy(script.gameName);

      const modified = [];

      for (let i = 0; i < categories.length; i++) {
        const match = categories[i].gameName.match(
          /(?:\[[^\]]*\]\s*)?([^\[\]]+)/,
        );
        if (match?.[1]) {
          modified.push({ gameName: match[1].trim() });
        }
      }

      return modified;
    },
    {
      query: t.Object({
        limit: t.Numeric({ maximum: 25 }),
      }),
    },
  )
  .get(
    "/",
    async ({ query }) => {
      const page = query.page ? query.page : 1;
      const limit = query.limit ? query.limit : 16;
      const offset = (page - 1) * limit;

      const scriptWhere = and(
        query.q
          ? or(
              ilike(script.title, query.q),
              ilike(script.gameName, query.q),
              ilike(script.description, query.q),
            )
          : undefined,
        query.exclude ? not(eq(script.id, query.exclude)) : undefined,
        query.u ? eq(script.userId, query.u) : undefined,
      );

      const scripts = await db
        .select()
        .from(script)
        .where(scriptWhere)
        .orderBy(
          query.sort === "popular"
            ? desc(script.views)
            : query.sort === "oldest"
              ? asc(script.createdAt)
              : desc(script.createdAt),
        )
        .limit(limit)
        .offset(offset);

      const [quantity] = await db
        .select({
          count: count(),
        })
        .from(script)
        .where(scriptWhere);

      return {
        scripts,
        next: quantity.count > offset + limit ? page + 1 : null,
      };
    },
    {
      query: t.Partial(
        t.Object({
          sort: t.Union([
            t.Literal("latest"),
            t.Literal("popular"),
            t.Literal("oldest"),
          ]),
          q: t.String(),
          exclude: t.String(),
          u: t.Numeric(),
          page: t.Numeric({ minimum: 1 }),
          limit: t.Numeric({ minimum: 1, maximum: 20 }),
        }),
      ),
    },
  )
  .get("/:id", ({ params }) => ScriptsService.getById(params.id))
  .get("/raw/:id", async ({ params }) => ScriptsService.getRawById(params.id))
  .post("/view/:id", ({ params }) => ScriptsService.incrementViews(params.id))
  .guard((app) =>
    app
      .use(auth)
      .post(
        "/",
        async ({ user, body }) => {
          const { gameId, gameName } = await ScriptsService.getGameData(
            body.game,
          );

          const id = nanoid();
          AWSS3Service.uploadWithFile(body.thumbnail, `thumbnails/${id}`);

          const [created] = await db
            .insert(script)
            .values({
              id,
              title: body.title,
              gameName,
              description: body.description,
              script: body.script,
              gameId,
              userId: user.id,
            })
            .returning();

          return created;
        },
        { body: "script.create" },
      )
      .patch(
        "/:id",
        async ({ user, params, body }) => {
          await ScriptsService.getById(params.id, user.id);

          const { gameId, gameName } = await ScriptsService.getGameData(
            body.game,
          );

          if (body.thumbnail) {
            AWSS3Service.uploadWithFile(
              body.thumbnail,
              `thumbnails/${params.id}`,
            );
          }

          return await db
            .update(script)
            .set({
              title: body.title,
              gameName,
              description: body.description,
              script: body.script,
              gameId,
            })
            .where(eq(script.id, params.id))
            .returning();
        },
        { body: "script.update" },
      )
      .delete("/:id", async ({ user, params }) => {
        await ScriptsService.getById(params.id, user.id);

        await db
          .delete(script)
          .where(and(eq(script.id, params.id), eq(script.userId, user.id)));

        AWSS3Service.deleteFile("thumbnails", params.id);

        return "OK";
      }),
  );
