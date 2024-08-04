import { ScriptList } from "@/components/script-list";
import { api } from "@/lib/api";
import type { Metadata } from "next";
import { title } from "../shared-metadata";

export const metadata: Metadata = {
  title,
  openGraph: { title },
  twitter: { title },
};

export default async function Home() {
  const { data: categories } = await api.v1.scripts.categories.get({
    fetch: { next: { revalidate: 60 } },
  });
  const { data } = await api.v1.scripts.index.get({
    query: {},
    fetch: {
      cache: "no-store",
    },
  });

  return (
    <>
      {categories && data && (
        <ScriptList categories={categories} initial={data} />
      )}
    </>
  );
}
