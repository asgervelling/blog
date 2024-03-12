import { Skeleton } from "./ui/skeleton";

export default function PostSkeleton() {
  return (
    <div className="h-full space-y-2 pt-9">
      <Skeleton className="h-16 w-3/5" />
      <Skeleton className="h-[30vh] w-full pt-4" />
      <Skeleton className="h-[30vh] w-2/5 pt-4" />
    </div>
  );
}
