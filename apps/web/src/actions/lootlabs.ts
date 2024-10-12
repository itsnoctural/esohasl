"use server";

import { redirect } from "next/navigation";

export async function lootlabs(href: string, fallback: string) {
  const link = await fetch(
    "https://be.lootlabs.gg/api/lootlabs/url_encryptor",
    {
      method: "POST",
      headers: {
        Authorization: process.env.LOOTLABS_API_KEY,
      },
      body: JSON.stringify({
        destination_url: `${process.env.NEXT_PUBLIC_API}/v1/access?return=${href}`,
      }),
    },
  ).then(async (response) => {
    if (!response.ok) return fallback;

    const data = await response.json();
    return `${process.env.LOOTLABS_LINK}&data=${data.message}`;
  });

  return redirect(link);
}
