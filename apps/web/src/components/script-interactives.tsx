"use client";

import { Check, Copy } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "./ui/button";

export function ScriptInteractives({
  script,
  gameId,
}: {
  script: string;
  gameId: string;
}) {
  const [isCopied, setIsCopied] = useState(false);

  const copyScript = () => {
    navigator.clipboard.writeText(script);
    setIsCopied(true);

    const handler = setTimeout(() => {
      setIsCopied(false);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button variant={"secondary"} asChild>
        {gameId !== "0" && (
          <Link href={`https://www.roblox.com/games/${gameId}`} target="_blank">
            Game Link
          </Link>
        )}
      </Button>
      <Button size={"icon"} variant={"secondary"} onClick={() => copyScript()}>
        {isCopied ? <Check size={16} /> : <Copy size={16} />}
      </Button>
    </div>
  );
}
