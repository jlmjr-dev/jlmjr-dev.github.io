import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { Hero } from "@/components/hero";
import { AboutSection } from "@/components/about-section";
import { ExperienceSection } from "@/components/experience-section";
import { ProjectsSection } from "@/components/projects-section";
import { SkillsSection } from "@/components/skills-section";
import { ContactSection } from "@/components/contact-section";
import { DriveWorld } from "@/components/three/drive-world";

export default async function PortfolioPage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  const dict = getDictionary(locale);

  const sections = [
    { id: "about", label: dict.nav.about, node: <AboutSection dict={dict} /> },
    {
      id: "experience",
      label: dict.nav.experience,
      node: <ExperienceSection locale={locale} dict={dict} />,
    },
    {
      id: "projects",
      label: dict.nav.projects,
      node: <ProjectsSection locale={locale} dict={dict} />,
    },
    { id: "skills", label: dict.nav.skills, node: <SkillsSection dict={dict} /> },
    { id: "contact", label: dict.nav.contact, node: <ContactSection dict={dict} /> },
  ];

  return (
    <main>
      <DriveWorld
        sections={sections}
        hint={dict.drive.hint}
        plainLabel={dict.drive.plain}
        driveLabel={dict.drive.driveMode}
        closeLabel={dict.drive.close}
      >
        <Hero locale={locale} dict={dict} />
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          {sections.map((section) => (
            <div key={section.id}>{section.node}</div>
          ))}
        </div>
      </DriveWorld>
    </main>
  );
}
