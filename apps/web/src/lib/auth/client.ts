import { api } from "@/lib/api";

export async function auth() {
  const { data } = await api.v1.users["@me"].index.get({
    fetch: { credentials: "include" },
  });

  return data;
}
