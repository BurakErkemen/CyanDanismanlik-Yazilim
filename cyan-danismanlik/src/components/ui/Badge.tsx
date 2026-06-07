import type { ReactNode } from "react";
import { cn } from "./cn";

/** Small pill — used for tags, specialties, tech stacks. */
export default function Badge({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-gray-300",
        className,
      )}
    >
      {children}
    </span>
  );
}
