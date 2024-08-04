import { error } from "elysia";

export async function getUserGithub(accessToken: string) {
  const res = await fetch("https://api.github.com/user", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) throw error(400);

  const json = await res.json();

  return json;
}

export async function getUserGoogle(accessToken: string) {
  const { sub, name, picture } = await fetch(
    "https://www.googleapis.com/oauth2/v3/userinfo",
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  ).then((v) => v.json());

  if (!name || !picture) throw error(400);

  return { sub, name, picture };
}
