import { cn } from "./cn";

/* ---- Button ------------------------------------------------------------- */
export type ButtonVariant = "primary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const buttonBase =
  "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-300 " +
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 disabled:opacity-50 disabled:pointer-events-none";

const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    "text-[#042027] bg-gradient-to-br from-brand-light to-brand-dark " +
    "shadow-[0_10px_30px_-10px_rgba(34,211,238,0.6)] hover:shadow-[0_18px_44px_-12px_rgba(34,211,238,0.85)] hover:-translate-y-0.5",
  outline:
    "text-brand-light border border-brand/40 hover:border-brand hover:bg-brand/10 hover:-translate-y-0.5",
  ghost: "text-gray-300 hover:text-white hover:bg-white/5",
};

const buttonSizes: Record<ButtonSize, string> = {
  sm: "text-sm px-4 py-2",
  md: "text-sm px-6 py-3",
  lg: "text-base px-8 py-3.5",
};

/** Composed button class — use on <a>/<Link> to match <Button>. */
export function buttonClass(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className?: string,
): string {
  return cn(buttonBase, buttonVariants[variant], buttonSizes[size], className);
}

/* ---- Card --------------------------------------------------------------- */
const cardBase = "glass rounded-2xl glow-soft";

/** Composed card-surface class — use on <Link>/<a> to match <Card>. */
export function cardClass(interactive = false, className?: string): string {
  return cn(cardBase, interactive && "ring-hover group", className);
}
