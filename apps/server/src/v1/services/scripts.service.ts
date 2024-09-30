import { and, db, eq, script as scriptSchema, sql, user } from "@esohasl/db";
import { error } from "elysia";

const idRegex = /\/games\/(\d+)\/?/;

export async function findAll() {
  return await db.select().from(scriptSchema);
}

export async function getById(id: string, userId?: number) {
  const [script] = await db
    .select({
      id: scriptSchema.id,
      createdAt: scriptSchema.createdAt,
      title: scriptSchema.title,
      description: scriptSchema.description,
      script: scriptSchema.script,
      gameId: scriptSchema.gameId,
      views: scriptSchema.views,
      userId: scriptSchema.userId,
      user: {
        username: user.username,
      },
    })
    .from(scriptSchema)
    .innerJoin(user, eq(scriptSchema.userId, user.id))
    .where(
      and(
        eq(scriptSchema.id, id),
        userId ? eq(scriptSchema.userId, userId) : undefined,
      ),
    );

  if (!script) throw error(404);

  return script;
}

export async function getRawById(id: string) {
  const script = await db.query.script.findFirst({
    where: eq(scriptSchema.id, id),
    columns: {
      script: true,
    },
  });

  if (!script) throw error(404);

  return script.script;
}

export async function incrementViews(id: string) {
  await db
    .update(scriptSchema)
    .set({ views: sql`${scriptSchema.views} + 1` })
    .where(eq(scriptSchema.id, id));
}

export async function getGameData(url: string | undefined) {
  if (!url) return { gameId: "0", gameName: "Universal" };
  const gameId = await getGameId(url);

  const { universeId } = await fetch(
    `https://apis.roblox.com/universes/v1/places/${gameId}/universe`,
  ).then((v) => v.json());

  if (!universeId) throw error(400);

  const { name } = await fetch(
    `https://develop.roblox.com/v1/universes/${universeId}`,
  ).then((v) => v.json());

  if (!name) throw error(400);

  return { gameId, gameName: name };
}

async function getGameId(url: string) {
  const gameId = url.match(idRegex);
  if (!gameId || !gameId[1]) throw error(400);

  return gameId[1];
}
