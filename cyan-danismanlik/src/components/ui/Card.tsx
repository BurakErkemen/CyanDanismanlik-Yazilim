import type { HTMLAttributes } from "react";
import { cn } from "./cn";
import { cardClass } from "./variants";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Adds hover lift + brand ring. */
  interactive?: boolean;
}

export default function Card({ interactive = false, className, ...props }: CardProps) {
  return <div className={cardClass(interactive, className)} {...props} />;
}

/** Thin brand accent line that grows on group-hover. */
export function CardAccent({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "h-0.5 w-8 rounded-full bg-gradient-to-r from-brand-light to-brand-dark transition-all duration-300 group-hover:w-14",
        className,
      )}
    />
  );
}
