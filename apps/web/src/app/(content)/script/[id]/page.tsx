import { url } from "@/app/shared-metadata";
import { Card } from "@/components/card";
import { CodeHighlight } from "@/components/code-highlight";
import { ScriptInteractives } from "@/components/script-interactives";
import { api } from "@/lib/api";
import { intlFormatDistance } from "date-fns";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { data } = await api.v1.scripts({ id: params.id }).get({
    fetch: { next: { revalidate: 60 } },
  });

  if (!data) return { title: "404 | Not Found" };

  return {
    title: data.title,
    authors: [{ name: data.user.username }],
    openGraph: {
      title: data.title,
      ...(data.description && { description: data.description }),
      url: `${url}/script/${data.id}`,
      images: `${process.env.NEXT_PUBLIC_CDN}/thumbnails/${data.id}`,
      siteName: "esohasl.net",
    },
    twitter: {
      title: data.title,
      ...(data.description && { description: data.description }),
      images: `${process.env.NEXT_PUBLIC_CDN}/thumbnails/${data.id}`,
    },
  };
}

export default async function ScriptPage({
  params,
}: {
  params: { id: string };
}) {
  const { data } = await api.v1.scripts({ id: params.id }).get({
    fetch: {
      next: { revalidate: 60 },
    },
  });

  if (!data) notFound();

  const { data: suggestions } = await api.v1.scripts.index.get({
    query: { exclude: params.id, limit: 8 },
  });

  api.v1.scripts.view({ id: params.id }).post(null, {
    fetch: {
      cache: "no-store",
    },
  });

  return (
    <main className="mx-auto my-10 flex max-w-screen-xl flex-col justify-between gap-y-8">
      <div className="flex flex-col gap-y-4">
        <Image
          src={`/thumbnails/${data.id}`}
          width={720}
          height={405}
          className="aspect-video rounded-xl object-cover"
          alt={`${data.title} thumbnail`}
        />

        <div className="flex flex-col gap-y-1">
          <h1 className="text-2xl font-semibold">{data.title}</h1>
          <div className="flex items-center gap-x-3">
            <Image
              src={`/avatars/${data.userId}`}
              width={40}
              height={40}
              className="rounded-3xl"
              alt={`${data.user.username} avatar`}
            />
            <span className="text-lg font-medium">{data.user.username}</span>
          </div>
        </div>

        <div className="rounded-lg bg-muted/75 p-3">
          <div className="flex gap-x-4 font-medium">
            <span>{data.views} views</span>
            <span>{intlFormatDistance(data.createdAt, new Date())}</span>
          </div>
          {data.description && (
            <p className="whitespace-pre-line">{data.description}</p>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between rounded-t-lg border bg-background/85 p-3">
            <span>esohasl.net</span>
            <ScriptInteractives script={data.script} gameId={data.gameId} />
          </div>
          <CodeHighlight code={data.script} />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {suggestions?.scripts?.map((item) => (
          <Card key={item.id} {...item} />
        ))}
      </div>
    </main>
  );
}
