import type { HTMLAttributes } from "react";
import { cn } from "./cn";

type Width = "narrow" | "default" | "wide";

const widthClasses: Record<Width, string> = {
  narrow: "max-w-3xl",
  default: "max-w-5xl",
  wide: "max-w-6xl",
};

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  width?: Width;
}

export function Container({ width = "default", className, ...props }: ContainerProps) {
  return <div className={cn("mx-auto px-4", widthClasses[width], className)} {...props} />;
}

interface SectionProps extends HTMLAttributes<HTMLElement> {
  /** Adds a hairline top border to separate stacked sections. */
  divider?: boolean;
  width?: Width;
  /** Wrap children in a Container; set false for full-bleed sections. */
  contained?: boolean;
}

export default function Section({
  divider = false,
  width = "default",
  contained = true,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn("py-16 sm:py-20 px-4", divider && "border-t border-white/10", className)}
      {...props}
    >
      {contained ? (
        <Container width={width} className="px-0">
          {children}
        </Container>
      ) : (
        children
      )}
    </section>
  );
}
