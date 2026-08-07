"use client";

import { useState } from "react";

export interface GitBranchJob {
  kind: "branch";
  branch: string;
  company: string;
  role: string;
  period: string;
  location: string;
  commits: string[];
  tech: string[];
}

export interface GitMainCommit {
  kind: "commit";
  label: string;
  period: string;
}

export type GitItem = GitBranchJob | GitMainCommit;

const BRANCH_COLORS = [
  "text-emerald-400",
  "text-sky-400",
  "text-amber-300",
  "text-fuchsia-400",
  "text-rose-400",
];

function shortHash(text: string): string {
  let hash = 5381;
  for (let i = 0; i < text.length; i++) {
    hash = ((hash << 5) + hash + text.charCodeAt(i)) >>> 0;
  }
  return hash.toString(16).padStart(7, "0").slice(0, 7);
}

function commitPrefix(text: string): string {
  if (/pipeline|install|core web vitals|otimiz|reduzi/i.test(text)) {
    return "perf:";
  }
  if (/mentor|confluence/i.test(text)) {
    return "docs:";
  }
  if (/migra|consolidat|moderniz|rewrite|reescrita/i.test(text)) {
    return "refactor:";
  }
  return "feat:";
}

function commitSubject(text: string): string {
  const lowered = text.charAt(0).toLowerCase() + text.slice(1);
  if (lowered.length <= 72) {
    return lowered;
  }
  const cut = lowered.slice(0, 72);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

interface GitLogProps {
  items: GitItem[];
}

export function GitLog({ items }: GitLogProps) {
  let branchIndex = -1;
  return (
    <div className="overflow-hidden rounded-lg border border-edge bg-[#0d1117] text-[13px] leading-relaxed text-[#c9d1d9] sm:text-sm">
      <div className="flex items-center gap-2 border-b border-[#21262d] px-4 py-2 font-mono text-xs text-[#8b949e]">
        <span className="size-2.5 rounded-full bg-[#f85149]" aria-hidden />
        <span className="size-2.5 rounded-full bg-[#d29922]" aria-hidden />
        <span className="size-2.5 rounded-full bg-[#3fb950]" aria-hidden />
        <span className="ml-2">~/jose-luiz/career</span>
      </div>
      <div className="p-4 font-mono sm:p-6">
        <p className="text-[#8b949e]">
          <span className="text-[#3fb950]">$</span> git log --graph career
        </p>
        <div className="mt-3 flex flex-col gap-0.5">
          {items.map((item) => {
            if (item.kind === "commit") {
              return <MainCommit key={item.label} item={item} />;
            }
            branchIndex += 1;
            return (
              <BranchBlock
                key={item.branch}
                job={item}
                color={BRANCH_COLORS[branchIndex % BRANCH_COLORS.length]}
              />
            );
          })}
          <Row prefix="*" prefixClass="text-[#8b949e]">
            <span className="text-[#d29922]">0000000</span> init: hello world
          </Row>
        </div>
      </div>
    </div>
  );
}

interface RowProps {
  prefix: string;
  prefixClass?: string;
  children: React.ReactNode;
}

function Row({ prefix, prefixClass = "", children }: RowProps) {
  return (
    <div className="flex gap-3">
      <span className={`shrink-0 select-none whitespace-pre ${prefixClass}`}>{prefix}</span>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}

function MainCommit({ item }: { item: GitMainCommit }) {
  return (
    <Row prefix="*" prefixClass="text-[#8b949e]">
      <span className="text-[#d29922]">{shortHash(item.label)}</span>{" "}
      <span>
        docs: {item.label} <span className="text-[#8b949e]">({item.period})</span>
      </span>
    </Row>
  );
}

function BranchBlock({ job, color }: { job: GitBranchJob; color: string }) {
  return (
    <>
      <Row prefix="*" prefixClass="text-[#8b949e]">
        <span className="font-semibold text-[#c9d1d9]">
          Merge branch <span className={color}>&apos;{job.branch}&apos;</span>
        </span>{" "}
        <span className="text-[#8b949e]">({job.period})</span>
      </Row>
      <Row prefix="|\" prefixClass={color} aria-hidden>
        <span />
      </Row>
      <Row prefix="| |" prefixClass={color}>
        <span className="text-[#8b949e]">
          # {job.role} · {job.company} · {job.location}
        </span>
      </Row>
      {job.commits.map((commit) => (
        <CommitRow key={commit.slice(0, 32)} text={commit} color={color} />
      ))}
      <Row prefix="| |" prefixClass={color}>
        <span className="text-[#8b949e]"># stack: {job.tech.join(", ")}</span>
      </Row>
      <Row prefix="|/" prefixClass={color}>
        <span />
      </Row>
    </>
  );
}

function CommitRow({ text, color }: { text: string; color: string }) {
  const [expanded, setExpanded] = useState(false);
  const subject = commitSubject(text);
  const truncated = subject.endsWith("…");

  return (
    <Row prefix="| *" prefixClass={color}>
      <button
        type="button"
        onClick={() => setExpanded((open) => !open)}
        aria-expanded={expanded}
        className="min-w-0 text-left hover:underline"
      >
        <span className="text-[#d29922]">{shortHash(text)}</span>{" "}
        <span className="text-[#79c0ff]">{commitPrefix(text)}</span>{" "}
        {expanded ? text : subject}
        <ExpandHint truncated={truncated} expanded={expanded} />
      </button>
    </Row>
  );
}

function ExpandHint({ truncated, expanded }: { truncated: boolean; expanded: boolean }) {
  if (!truncated) {
    return null;
  }
  return <span className="ml-1.5 text-[#8b949e]">{expanded ? "[-]" : "[+]"}</span>;
}
