import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { Hero } from "@/components/hero";
import { AboutSection } from "@/components/about-section";
import { ExperienceSection } from "@/components/experience-section";
import { ProjectsSection } from "@/components/projects-section";
import { SkillsSection } from "@/components/skills-section";
import { ContactSection } from "@/components/contact-section";
import { PageSnake } from "@/components/snake/page-snake";

export default async function PortfolioPage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  const dict = getDictionary(locale);

  return (
    <main>
      <Hero locale={locale} dict={dict} />
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <AboutSection dict={dict} />
        <ExperienceSection locale={locale} dict={dict} />
        <ProjectsSection locale={locale} dict={dict} />
        <SkillsSection dict={dict} />
        <ContactSection dict={dict} />
      </div>
      <PageSnake locale={locale} dict={dict} />
    </main>
  );
}
