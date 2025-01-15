"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function start(href: string) {
  cookies().set("esohasl.return", href);

  return redirect("https://workink.net/2vP/m5vhhukb");
}
