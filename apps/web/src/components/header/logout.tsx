"use client";

import { logout } from "@/actions/logout";
import { DropdownMenuItem } from "../ui/dropdown-menu";

export function Logout() {
  return <DropdownMenuItem onClick={() => logout()}>Logout</DropdownMenuItem>;
}
