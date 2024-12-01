import { db, session, user } from "@esohasl/db";
import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { GitHub, Google } from "arctic";
import { Lucia } from "lucia";

const adapter = new DrizzleSQLiteAdapter(db, session, user);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    name: "esohasl.auth",
    attributes: {
      secure: Bun.env.NODE_ENV === "production",
      domain:
        Bun.env.NODE_ENV === "production" ? Bun.env.AUTH_DOMAIN : "localhost",
    },
  },
  getUserAttributes: (attributes) => {
    return {
      username: attributes.username,

      createdAt: attributes.createdAt,
      updatedNameAt: attributes.updatedNameAt,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    UserId: number;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  username: string;
  createdAt: Date;
  updatedNameAt: Date;
}

export const github = new GitHub(
  Bun.env.GITHUB_CLIENT_ID,
  Bun.env.GITHUB_CLIENT_SECRET,
  Bun.env.GITHUB_REDIRECT_URI,
);

export const google = new Google(
  Bun.env.GOOGLE_CLIENT_ID,
  Bun.env.GOOGLE_CLIENT_SECRET,
  Bun.env.GOOGLE_REDIRECT_URI,
);
