"use client";

import { api } from "@/lib/api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Card, CardSkeletons } from "./card";
import { Chip, ChipGroup } from "./chip-group";
import { Button } from "./ui/button";

export function ScriptList({
  categories,
  initial,
}: {
  categories: { gameName: string }[];
  initial: {
    scripts: {
      id: string;
      createdAt: Date;
      title: string;
      gameName: string;
      description: string | null;
      script: string;
      gameId: string;
      views: number;
      userId: number;
    }[];
    next: number | null;
  };
}) {
  const [game, setGame] = useState("All");

  const { isLoading, data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["/scripts", game],
      queryFn: async ({ pageParam }) => {
        const { data } = await api.v1.scripts.index.get({
          query:
            game === "All" ? { page: pageParam } : { q: game, page: pageParam },
        });
        return data;
      },
      getNextPageParam: (lastPage) => lastPage?.next,
      initialPageParam: 1,
      initialData:
        game === "All" ? { pages: [initial], pageParams: [] } : undefined,
    });

  return (
    <main className="mx-auto flex w-full max-w-screen-xl flex-col">
      <ChipGroup defaultValue={"All"} onSelect={(value) => setGame(value)}>
        {categories.map((item) => (
          <Chip key={item.gameName} value={item.gameName} />
        ))}
      </ChipGroup>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {isLoading ? (
          <CardSkeletons quantity={16} />
        ) : (
          data?.pages.map((page) =>
            page?.scripts.map((item, index) => (
              <Card key={item.id} {...item} priority={index <= 3} />
            )),
          )
        )}

        {isFetchingNextPage && <CardSkeletons quantity={16} />}
      </div>

      <div className="my-6 flex justify-center">
        {!isLoading && !isFetchingNextPage && hasNextPage && (
          <Button className="w-80" onClick={() => fetchNextPage()}>
            Load more
          </Button>
        )}
      </div>
    </main>
  );
}
