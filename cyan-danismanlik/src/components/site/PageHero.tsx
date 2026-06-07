import type { ReactNode } from "react";
import { Container, Eyebrow } from "@/components/ui";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  subtitle?: ReactNode;
}

/** Centered hero band used by interior pages (services, blog, team). */
export default function PageHero({ eyebrow, title, subtitle }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-white/10 px-4 pt-20 pb-16 text-center">
      <Container width="narrow" className="px-0">
        <div className="animate-fade-up">
          <div className="mb-5 flex justify-center">
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            <span className="text-gradient">{title}</span>
          </h1>
          {subtitle && (
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-gray-400">{subtitle}</p>
          )}
        </div>
      </Container>
    </section>
  );
}
