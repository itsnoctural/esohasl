import Link from "next/link";

export function Footer() {
  return (
    <footer className="z-50 w-full">
      <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center rounded-xl border border-t bg-background/75 pb-2 pt-4">
        <div className="flex">
          <span>&copy; esohasl.net | Built with ❤️ by&nbsp;</span>
          <Link
            href={"/youtube"}
            target="_blank"
            className="text-muted-foreground"
          >
            esohasl
          </Link>
        </div>

        <div className="flex gap-x-4">
          <Link href={"/privacy"} className="text-muted-foreground">
            Privacy Policy
          </Link>
          <Link href={"/tos"} className="text-muted-foreground">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
