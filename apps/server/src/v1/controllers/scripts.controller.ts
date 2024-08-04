import { type Prisma, prisma } from "@esohasl/db";
import { Elysia, t } from "elysia";
import { customAlphabet } from "nanoid";
import { ScriptModels } from "../models/script.model";
import { auth } from "../plugins/auth";
import * as BunnyService from "../services/bunny.service";
import * as ScriptsService from "../services/scripts.service";

const alphabet =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const nanoid = customAlphabet(alphabet, 8);

export const ScriptsController = new Elysia({ prefix: "/scripts" })
  .use(ScriptModels)
  .get("/categories", async () => {
    const categories = await prisma.script.groupBy({
      by: "gameName",
      _sum: {
        views: true,
      },
      orderBy: {
        _sum: {
          views: "desc",
        },
      },
    });

    const modified = [];

    for (let i = 0; i < 7; i++) {
      const match = categories[i].gameName.match(
        /(?:\[[^\]]*\]\s*)?([^\[\]]+)/,
      );
      if (match?.[1]) {
        modified.push({ gameName: match[1].trim() });
      }
    }

    return modified;
  })
  .get(
    "/",
    async ({ query }) => {
      const user: Prisma.ScriptWhereInput = query.u
        ? { user: { id: { equals: query.u } } }
        : {};
      const exclude = query.exclude
        ? { NOT: { id: { equals: query.exclude } } }
        : {};
      const search: Prisma.ScriptWhereInput = query.q
        ? {
            OR: [
              { title: { contains: query.q, mode: "insensitive" } },
              { gameName: { contains: query.q, mode: "insensitive" } },
              { description: { contains: query.q, mode: "insensitive" } },
            ],
          }
        : {};

      const scriptWhere = { ...search, ...exclude, ...user };

      const page = query.page ? query.page : 1;
      const limit = query.limit ? query.limit : 16;
      const skip = (page - 1) * limit;

      const scripts = await prisma.script.findMany({
        where: scriptWhere,
        orderBy:
          query.sort === "popular"
            ? { views: "desc" }
            : query.sort === "oldest"
              ? { createdAt: "asc" }
              : { createdAt: "desc" },

        skip,
        take: limit,
      });

      const quantity = await prisma.script.count({ where: scriptWhere });

      return {
        scripts,
        next: quantity > skip + limit ? page + 1 : null,
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
          BunnyService.uploadWithFile(body.thumbnail, `thumbnails/${id}`);

          return await prisma.script.create({
            data: {
              id,
              title: body.title,
              gameName,
              description: body.description,
              script: body.script,
              gameId,
              user: { connect: { id: user.id } },
            },
          });
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
            await BunnyService.deleteFile("thumbnails", params.id);
            BunnyService.uploadWithFile(
              body.thumbnail,
              `thumbnails/${params.id}`,
            );
          }

          return await prisma.script.update({
            where: { id: params.id },
            data: {
              title: body.title,
              gameName,
              description: body.description,
              script: body.script,
              gameId,
            },
          });
        },
        { body: "script.update" },
      )
      .delete("/:id", async ({ user, params, error }) => {
        try {
          await prisma.script.delete({
            where: { id: params.id, userId: user.id },
          });

          BunnyService.deleteFile("thumbnails", params.id);

          return "OK";
        } catch {
          throw error(404);
        }
      }),
  );
