import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { Identity } from "@/components/identity";
import { PaneTabs, type PaneDefinition } from "@/components/pane-tabs";
import { AboutPane } from "@/components/panes/about-pane";
import { WorkPane } from "@/components/panes/work-pane";
import { ProjectsPane } from "@/components/panes/projects-pane";
import { StackPane } from "@/components/panes/stack-pane";

export default async function PortfolioPage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  const dict = getDictionary(locale);

  const panes: PaneDefinition[] = [
    { id: "about", label: dict.tabs.about, content: <AboutPane locale={locale} dict={dict} /> },
    { id: "work", label: dict.tabs.work, content: <WorkPane locale={locale} dict={dict} /> },
    {
      id: "projects",
      label: dict.tabs.projects,
      content: <ProjectsPane locale={locale} dict={dict} />,
    },
    { id: "stack", label: dict.tabs.stack, content: <StackPane dict={dict} /> },
  ];

  return (
    <div className="bezel">
      <a href="#content" className="skip-link">
        {dict.a11y.skipToContent}
      </a>
      <div className="screen">
        <div className="shell">
          <Identity locale={locale} dict={dict} />
          <PaneTabs panes={panes} sectionsLabel={dict.a11y.sections} />
        </div>
      </div>
    </div>
  );
}
