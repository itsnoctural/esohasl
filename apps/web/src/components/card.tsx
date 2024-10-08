import { intlFormatFromNow } from "@/lib/date";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";

type CardProps = {
  id: string;
  title: string;
  gameName: string;
  views: number;
  createdAt: Date;
  userId: number;
  priority?: boolean;
};

export function Card({
  id,
  title,
  gameName,
  views,
  createdAt,
  userId,
  priority,
}: CardProps) {
  return (
    <Link href={`/script/${id}`} prefetch={false}>
      <div className="flex flex-col gap-y-3">
        <div>
          <Image
            src={`/thumbnails/${id}`}
            alt={`${title} thumbnail`}
            width={305}
            height={172}
            className="aspect-video w-full rounded-lg object-cover"
            priority={priority}
          />
        </div>

        <div className="flex gap-x-3">
          <div>
            <Image
              src={`/avatars/${userId}`}
              width={36}
              height={36}
              alt={`${userId} avatar`}
              className="rounded-3xl"
            />
          </div>
          <div className="flex w-full flex-col">
            <span className="font-medium">{title}</span>
            <span className="text-sm text-muted-foreground">{gameName}</span>
            <div className="flex text-sm text-muted-foreground">
              <span>{views} views</span>
              <span className="before:mx-2 before:content-['•']">
                {intlFormatFromNow(createdAt)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
export function CardSkeletons({ quantity }: { quantity: number }) {
  return Array.from(new Array(quantity)).map((_, index) => (
    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
    <div key={index} className="flex flex-col gap-y-3">
      <Skeleton className="h-[10.75rem] w-full rounded-lg" />
      <div className="flex gap-x-3">
        <div>
          <Skeleton className="size-9 rounded-3xl" />
        </div>
        <div className="flex w-full flex-col gap-y-2">
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-4 w-2/5" />
          <Skeleton className="h-4 w-3/5" />
        </div>
      </div>
    </div>
  ));
}
