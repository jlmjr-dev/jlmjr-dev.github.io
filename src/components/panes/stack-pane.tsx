import type { Dictionary } from "@/i18n/types";
import { skillGroups, type Skill } from "@/content/skills";
import { ArrowUpRightIcon } from "@/components/icons";
import { BrandIcon } from "@/components/brand-icon";

interface StackPaneProps {
  dict: Dictionary;
}

export function StackPane({ dict }: StackPaneProps) {
  return (
    <div>
      <p className="meta mb-5">{dict.stack.intro}</p>
      <div className="flex flex-col gap-6">
        {skillGroups.map((group) => (
          <section key={group.key}>
            <h3 className="label">{dict.stack.groups[group.key]}</h3>
            <ul className="mt-2.5 flex flex-wrap gap-1.5">
              {group.items.map((skill) => (
                <li key={skill.name}>
                  <SkillChip skill={skill} newTabLabel={dict.a11y.opensInNewTab} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <p className="meta mt-6 inline-flex items-center gap-1.5">
        {dict.stack.outro}
        <ArrowUpRightIcon className="size-3" />
      </p>
    </div>
  );
}

function SkillChip({ skill, newTabLabel }: { skill: Skill; newTabLabel: string }) {
  return (
    <a href={skill.url} target="_blank" rel="noreferrer" className="chip">
      <BrandIcon slug={skill.slug} />
      {skill.name}
      <span className="sr-only"> ({newTabLabel})</span>
    </a>
  );
}
