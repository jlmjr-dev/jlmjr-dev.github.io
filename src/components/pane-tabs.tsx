"use client";

import { useRef, type KeyboardEvent, type ReactNode } from "react";
import { defaultPane } from "@/content/panes";
import { setActiveTab, useActiveTab } from "@/skins/appearance";

export interface PaneDefinition {
  id: string;
  label: string;
  content: ReactNode;
}

interface PaneTabsProps {
  panes: PaneDefinition[];
  sectionsLabel: string;
}

/* Which pane is visible is decided by CSS from `html[data-tab]`, which the
   pre-paint script sets from storage. React only owns the tab semantics, so
   there is no flash of the wrong pane and no-JS visitors still see one. */
export function PaneTabs({ panes, sectionsLabel }: PaneTabsProps) {
  const activeId = useActiveTab(defaultPane);
  const active = Math.max(
    0,
    panes.findIndex((pane) => pane.id === activeId),
  );
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const focusTab = (index: number) => {
    const next = (index + panes.length) % panes.length;
    setActiveTab(panes[next].id);
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const moves: Record<string, number> = {
      ArrowRight: index + 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: panes.length - 1,
    };
    const target = moves[event.key];
    if (target === undefined) {
      return;
    }
    event.preventDefault();
    focusTab(target);
  };

  return (
    <main id="content" tabIndex={-1} className="main">
      <div className="tabbar" role="tablist" aria-label={sectionsLabel}>
        {panes.map((pane, index) => (
          <button
            key={pane.id}
            ref={(node) => {
              tabRefs.current[index] = node;
            }}
            type="button"
            role="tab"
            id={`tab-${pane.id}`}
            aria-controls={`pane-${pane.id}`}
            aria-selected={index === active}
            tabIndex={index === active ? 0 : -1}
            onClick={() => setActiveTab(pane.id)}
            onKeyDown={(event) => onKeyDown(event, index)}
            className="tab"
          >
            {pane.label}
          </button>
        ))}
      </div>
      {panes.map((pane) => (
        <div
          key={pane.id}
          role="tabpanel"
          id={`pane-${pane.id}`}
          data-pane={pane.id}
          aria-labelledby={`tab-${pane.id}`}
          tabIndex={0}
          className="pane"
        >
          <h2 className="sr-only">{pane.label}</h2>
          {pane.content}
        </div>
      ))}
    </main>
  );
}
