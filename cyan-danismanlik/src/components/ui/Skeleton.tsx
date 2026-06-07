import { cn } from "./cn";

/** Pulsing placeholder block — compose to mirror real content while loading. */
export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-lg bg-white/[0.06]", className)} />;
}

/** Card-shaped placeholder used in blog / team grids. */
export function SkeletonCard() {
  return (
    <div className="glass overflow-hidden rounded-2xl">
      <Skeleton className="h-48 w-full rounded-none" />
      <div className="space-y-3 p-6">
        <Skeleton className="h-2 w-10" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
      </div>
    </div>
  );
}
