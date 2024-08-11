import { auth } from "@/lib/auth/server";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Logout } from "./logout";

export async function Profile() {
  const user = await auth();

  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
          >
            <Image
              src={`/avatars/${user.id}`}
              width={36}
              height={36}
              alt="Avatar"
              className="overflow-hidden rounded-full"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{user.username}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem disabled>Profile</DropdownMenuItem>
          <DropdownMenuItem disabled>Dashboard</DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={"/upload"}>Upload</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <Logout />
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Button variant={"outline"} size={"sm"} asChild>
      <Link href={"/signin"} prefetch={false}>
        Sign In
      </Link>
    </Button>
  );
}
