import type { ReactNode } from "react";

interface ExternalLinkProps {
  href: string;
  /** Announced to screen readers so a new tab is never a surprise. */
  newTabLabel: string;
  className?: string;
  children: ReactNode;
}

export function ExternalLink({
  href,
  newTabLabel,
  className = "link",
  children,
}: ExternalLinkProps) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {children}
      <span className="sr-only"> ({newTabLabel})</span>
    </a>
  );
}

/** "https://www.localiza.com/" reads better as "localiza.com" in a meta line. */
export function displayHost(url: string): string {
  return new URL(url).hostname.replace(/^www\./, "");
}
