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
    <section id={id} className="scroll-mt-20 py-10 sm:py-14">
      <div className="rounded-xl border border-edge bg-background/85 p-6 backdrop-blur-sm sm:p-8">
        <Reveal>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{heading}</h2>
          <SectionIntro text={intro} />
        </Reveal>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

function SectionIntro({ text }: { text?: string }) {
  if (!text) {
    return null;
  }
  return <p className="mt-3 text-muted">{text}</p>;
}
