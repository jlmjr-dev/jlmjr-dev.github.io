import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";

interface SectionProps {
  id: string;
  heading: string;
  intro?: string;
  children: ReactNode;
}

export function Section({ id, heading, intro, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-20 py-14 sm:py-20">
      <Reveal>
        <h2 className="font-display text-2xl font-bold sm:text-3xl">
          <span className="text-accent-alt">►</span> {heading}
        </h2>
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
