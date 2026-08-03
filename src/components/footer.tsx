import type { Dictionary } from "@/i18n/types";

interface FooterProps {
  dict: Dictionary;
}

export function Footer({ dict }: FooterProps) {
  return (
    <footer className="border-t border-edge py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-1.5 px-4 text-center text-xs text-muted sm:px-6">
        <p>{dict.footer.credit}</p>
        <p className="font-mono">{dict.footer.note}</p>
      </div>
    </footer>
  );
}
