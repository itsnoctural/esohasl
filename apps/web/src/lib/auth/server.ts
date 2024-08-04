import { api } from "@/lib/api";
import { headers } from "next/headers";

export async function auth() {
  const { data } = await api.v1.users["@me"].index.get({
    headers: { Cookie: headers().get("Cookie") },
  });

  return data;
}
