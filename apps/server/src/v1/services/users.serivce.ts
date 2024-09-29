import { db, eq, like, user, user as userSchema } from "@esohasl/db";
import { error } from "elysia";

async function getNotTakenName(username: string) {
  const users = await db
    .select()
    .from(userSchema)
    .where(like(userSchema.username, username));

  if (users.length === 0) return username;

  return `${username}${users.length}`;
}

export async function findOrCreate(
  providerId: string,
  provider: string,
  name: string,
) {
  const [user] = await db
    .select()
    .from(userSchema)
    .where(eq(userSchema.providerId, providerId));
  const username = await getNotTakenName(
    name.normalize("NFKD").replace(/[^\w]/g, ""),
  );

  if (!user) {
    const [user] = await db
      .insert(userSchema)
      .values({
        providerId,
        provider,
        username,
      })
      .returning();

    return user;
  }

  return user;
}

export async function findByName(username: string) {
  return await db.query.user.findFirst({
    where: eq(userSchema.username, username),
    columns: {
      id: true,
      username: true,
      createdAt: true,
    },
  });
}

export async function findById(id: number) {
  // for now used only for auth middleware, no need to hide some fields
  return await db.select().from(user).where(eq(userSchema.id, id));
}

export async function updateUsername(
  id: number,
  updatedNameAt: Date | null,
  username: string,
) {
  if (updatedNameAt && Date.now() - +new Date(updatedNameAt) < 1209600000)
    throw error(429);
  if (await findByName(username)) throw error(409);

  await db
    .update(userSchema)
    .set({ username, updatedNameAt: new Date() })
    .where(eq(userSchema.id, id));

  return "OK";
}
