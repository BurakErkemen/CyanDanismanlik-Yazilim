import { Section, buttonClass } from "@/components/ui";

interface CallToActionProps {
  title: string;
  subtitle: string;
  phone?: string;
}

/** Closing call-to-action band with a phone CTA. */
export default function CallToAction({
  title,
  subtitle,
  phone = "+90 (553) 776 31 69",
}: CallToActionProps) {
  const tel = "tel:" + phone.replace(/[^\d+]/g, "");
  return (
    <Section divider width="narrow" className="text-center">
      <div className="relative overflow-hidden rounded-3xl glass px-6 py-14 glow-soft">
        <div className="absolute -inset-x-10 -top-24 h-48 bg-brand/20 opacity-50 blur-3xl" />
        <div className="relative">
          <h2 className="text-3xl font-bold tracking-tight text-white">{title}</h2>
          <p className="mx-auto mt-3 max-w-xl text-gray-400">{subtitle}</p>
          <div className="mt-8 flex justify-center">
            <a href={tel} className={buttonClass("primary", "lg")}>
              Hemen Ara: {phone}
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}
