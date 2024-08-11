import { prisma } from "@esohasl/db";
import { error } from "elysia";

async function getNotTakenName(username: string) {
  const users = await prisma.user.findMany({
    where: { username: { contains: username } },
  });

  if (users.length === 0) return username;

  return `${username}${users.length}`;
}

export async function findOrCreate(
  providerId: string,
  provider: string,
  name: string,
) {
  const user = await prisma.user.findUnique({ where: { providerId } });
  const username = await getNotTakenName(
    name.normalize("NFKD").replace(/[^\w]/g, ""),
  );

  if (!user) {
    return await prisma.user.create({
      data: { providerId, provider, username },
    });
  }

  return user;
}

export async function findByName(username: string) {
  return await prisma.user.findUnique({
    where: { username },
    select: { id: true, username: true, createdAt: true },
  });
}

export async function findById(id: number) {
  return await prisma.user.findUnique({
    where: { id },
    /* 
    select: { id: true, username: true, createdAt: true }; 
    
    for now used only for auth middleware, no need to hide some fields
    */
  });
}

export async function updateUsername(
  id: number,
  updatedNameAt: Date | null,
  username: string,
) {
  if (updatedNameAt && Date.now() - updatedNameAt.getTime() < 1209600000)
    throw error(429);
  if (await findByName(username)) throw error(409);

  await prisma.user.update({
    where: { id },
    data: { username, updatedNameAt: new Date() },
  });

  return "OK";
}
