"use server";

import { redirect } from "next/navigation";

export async function logout() {
  return redirect(`${process.env.NEXT_PUBLIC_API}/v1/auth/logout`);
}
