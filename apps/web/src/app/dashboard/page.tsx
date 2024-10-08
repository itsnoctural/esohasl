import Link from "next/link";

export default async function Page() {
  return (
    <div className="flex gap-x-2 min-h-screen items-center justify-center">
      <h1>Dashboard currently in progress. If you wan't upload script:</h1>
      <Link
        className="text-muted-foreground underline underline-offset-4"
        href={"/upload"}
      >
        /upload
      </Link>
    </div>
  );
}
