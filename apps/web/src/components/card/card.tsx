import { intlFormatFromNow } from "@/lib/date";
import Image from "next/image";
import Link from "next/link";

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
