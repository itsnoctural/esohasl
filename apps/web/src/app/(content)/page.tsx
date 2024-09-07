import { ScriptList } from "@/components/script-list";
import { api } from "@/lib/api";
import type { Metadata } from "next";
import { title } from "../shared-metadata";

export const metadata: Metadata = {
  title,
};

export default async function Home() {
  const [{ data: categories }, { data }] = await Promise.all([
    api.v1.scripts.categories.get({
      query: { limit: 10 },
      fetch: { next: { revalidate: 600 } },
    }),
    api.v1.scripts.index.get({
      query: {},
      fetch: {
        cache: "no-store",
      },
    }),
  ]);

  return (
    <>
      {categories && data && (
        <ScriptList categories={categories} initial={data} />
      )}
    </>
  );
}
