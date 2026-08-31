import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { education } from "@/content/education";
import { skillGroups } from "@/content/skills";
import { links } from "@/content/links";

const SITE = "https://jlmjr-dev.github.io";

/* A Person graph is what lets search engines tie this site to the GitHub and
   LinkedIn profiles as one entity. Built from the content modules so it cannot
   drift from what the page actually says. */
export function buildPersonGraph(locale: Locale, dict: Dictionary) {
  const page = `${SITE}/${locale}/`;
  const skills = skillGroups.flatMap((group) => group.items.map((item) => item.name));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE}/#website`,
        url: `${SITE}/`,
        name: "José Luiz Monteiro Junior",
        inLanguage: ["en", "pt-BR"],
        publisher: { "@id": `${SITE}/#person` },
      },
      {
        "@type": "WebPage",
        "@id": `${page}#webpage`,
        url: page,
        name: dict.meta.title,
        description: dict.meta.description,
        inLanguage: locale === "pt" ? "pt-BR" : "en",
        isPartOf: { "@id": `${SITE}/#website` },
        about: { "@id": `${SITE}/#person` },
        primaryImageOfPage: `${SITE}/og.png`,
      },
      {
        "@type": "Person",
        "@id": `${SITE}/#person`,
        name: "José Luiz Monteiro Junior",
        givenName: "José Luiz",
        familyName: "Monteiro Junior",
        jobTitle: dict.identity.role,
        description: dict.meta.description,
        url: page,
        image: `${SITE}/og.png`,
        email: `mailto:${links.email}`,
        sameAs: [links.github, links.linkedin],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Santa Lúcia",
          addressRegion: "PR",
          addressCountry: "BR",
        },
        knowsLanguage: [
          { "@type": "Language", name: "Portuguese", alternateName: "pt" },
          { "@type": "Language", name: "English", alternateName: "en" },
          { "@type": "Language", name: "French", alternateName: "fr" },
        ],
        alumniOf: education.map((entry) => ({
          "@type": "CollegeOrUniversity",
          name: entry.school,
          department: entry.degree[locale],
          ...(entry.schoolUrl ? { url: entry.schoolUrl[locale] } : {}),
        })),
        hasOccupation: {
          "@type": "Occupation",
          name: dict.identity.role,
          occupationalCategory: "15-1252.00",
          skills: skills.slice(0, 12).join(", "),
        },
        knowsAbout: skills.filter((skill) => skill !== "Claude Code"),
      },
    ],
  };
}
