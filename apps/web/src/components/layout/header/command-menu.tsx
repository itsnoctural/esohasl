"use client";

import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function CommandMenu() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 200);
  const [open, setOpen] = useState(false);

  const { isLoading, data } = useQuery({
    queryKey: ["/search", debouncedSearch],
    queryFn: async () => {
      const { data } = await api.v1.scripts.index.get({
        query: { q: debouncedSearch, limit: 10 },
      });
      return data?.scripts;
    },
    enabled: debouncedSearch !== "",
  });

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }

        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <Button
        variant="outline"
        className={
          "relative hidden h-8 w-full justify-start rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:inline-flex sm:pr-12"
        }
        onClick={() => {
          // biome-ignore lint/suspicious/noExplicitAny: <explanation>
          (window as any).plausible("search");
          setOpen(true);
        }}
      >
        <span>Search the best scripts...</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <Button
        size="icon"
        variant={"outline"}
        className="inline-flex sm:hidden"
        onClick={() => {
          // biome-ignore lint/suspicious/noExplicitAny: <explanation>
          (window as any).plausible("search");
          setOpen(true);
        }}
      >
        <Search size={16} />
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Type a command or search..."
          value={search}
          onValueChange={(value) => setSearch(value)}
        />
        <CommandList className="[scrollbar-width:thin] p-1">
          {isLoading ? (
            Array.from(new Array(10)).map((_, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <Skeleton key={index} className="h-20 w-full mb-1" />
            ))
          ) : (
            <>
              <CommandEmpty>No results found.</CommandEmpty>
              {data?.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.id}
                  keywords={[item.title, item.gameName]}
                  onSelect={() => {
                    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
                    (window as any).plausible("pageview", {
                      props: { search_success: item.id },
                    });

                    runCommand(() => router.push(`/script/${item.id}`));
                  }}
                  className="flex gap-x-2"
                >
                  <Image
                    src={`/thumbnails/${item.id}`}
                    alt={`${item.title} thumbnail`}
                    width={80}
                    height={45}
                    className="aspect-video rounded object-cover"
                  />
                  <div className="flex flex-col">
                    <span className="font-medium">{item.title}</span>
                    <span className="text-sm text-muted-foreground">
                      {item.gameName}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
