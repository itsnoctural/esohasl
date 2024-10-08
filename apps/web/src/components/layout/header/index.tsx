import Link from "next/link";
import { FaDiscord } from "react-icons/fa";
import { ThemeToggle } from "../../theme-toggle";
import { Button } from "../../ui/button";
import { CommandMenu } from "./command-menu";
import { Profile } from "./profile";

export async function Header() {
  return (
    <header className="z-50 w-full">
      <div className="mx-auto flex h-14 w-full max-w-screen-xl items-center justify-between gap-x-1.5 rounded-xl border border-border bg-background/75 px-4">
        <div className="justify-start">
          <Link href={"/"}>
            <span className="text-lg font-semibold">esohasl.net</span>
          </Link>
        </div>
        <div className="flex w-full max-w-xl justify-end sm:justify-center">
          <CommandMenu />
        </div>
        <div className="flex items-center justify-end gap-x-1.5">
          <Button variant={"outline"} size={"icon"} asChild>
            <Link
              href={"/discord"}
              target="_blank"
              prefetch={false}
              aria-label="Discord"
            >
              <FaDiscord size={16} />
            </Link>
          </Button>

          <ThemeToggle />
          <Profile />
        </div>
      </div>
    </header>
  );
}
