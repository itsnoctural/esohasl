"use server";

import { redirect } from "next/navigation";

export async function signIn(provider: "google" | "github") {
  return redirect(`${process.env.NEXT_PUBLIC_API}/v1/auth/link/${provider}`);
}
