"use client";

import { start } from "@/actions/start";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export function StartSession() {
  const [url, setUrl] = useState<string>();

  useEffect(() => {
    setUrl(window.location.href);
  });

  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 flex flex-col items-center rounded-lg bg-background/85 p-4 text-center">
      <span className="mb-2 font-semibold text-lg">
        You need to watch ads to view this
      </span>
      <Button
        variant={"secondary"}
        className="mb-1 w-full"
        onClick={() => {
          if (url) start(url);
        }}
      >
        Start to unlock
      </Button>
      <span className="text-muted-foreground text-xs">
        Session will be saved for 24 hours.
      </span>
    </div>
  );
}
