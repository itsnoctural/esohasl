"use client";

export default function NotFound() {
  return (
    <main className="flex min-h-screen w-full">
      <div className="flex flex-1 items-center justify-center">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl">404</h1>
          <hr className="h-8 border border-foreground" />
          <h2 className="text-xl">This page could not be found.</h2>
        </div>
      </div>
    </main>
  );
}
