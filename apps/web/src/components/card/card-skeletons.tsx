import { Skeleton } from "../ui/skeleton";

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
