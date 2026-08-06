import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";

interface SectionProps {
  id: string;
  number: string;
  heading: string;
  intro?: string;
  children: ReactNode;
}

export function Section({ id, number, heading, intro, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-edge py-14 sm:py-20">
      <Reveal>
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-xs text-accent">{number}</span>
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">{heading}</h2>
        </div>
        <SectionIntro text={intro} />
      </Reveal>
      <div className="mt-10">{children}</div>
    </section>
  );
}

function SectionIntro({ text }: { text?: string }) {
  if (!text) {
    return null;
  }
  return <p className="mt-3 text-muted">{text}</p>;
}
