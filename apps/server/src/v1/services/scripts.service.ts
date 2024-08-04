import { prisma } from "@esohasl/db";
import { error } from "elysia";

const idRegex = /\/games\/(\d+)\/?/;

export async function findAll() {
  return await prisma.script.findMany();
}

export async function getById(id: string, userId?: number) {
  const script = await prisma.script.findUnique({
    where: { id, userId },
    include: { user: { select: { username: true } } },
  });

  if (!script) throw error(404);

  return script;
}

export async function getRawById(id: string) {
  const script = await prisma.script.findUnique({
    where: { id },
    select: { script: true },
  });

  if (!script) throw error(404);

  return script.script;
}

export async function incrementViews(id: string) {
  try {
    await prisma.script.update({
      where: { id },
      data: { views: { increment: 1 } },
    });

    return "OK";
  } catch {
    throw error(404);
  }
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
