import type { ReactNode } from "react";
import { cn } from "./cn";

/** Small uppercase brand label sitting above a heading. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-brand-light",
        className,
      )}
    >
      <span className="h-px w-6 bg-gradient-to-r from-transparent to-brand-light" />
      {children}
    </span>
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12 max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow && <div className="mb-4"><Eyebrow>{eyebrow}</Eyebrow></div>}
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">{title}</h2>
      {subtitle && <p className="mt-4 text-gray-400 leading-relaxed">{subtitle}</p>}
    </div>
  );
}
