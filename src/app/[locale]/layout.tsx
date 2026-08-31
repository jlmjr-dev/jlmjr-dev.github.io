import type { Metadata, Viewport } from "next";
import {
  Inter,
  Instrument_Serif,
  JetBrains_Mono,
  Space_Grotesk,
  VT323,
} from "next/font/google";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildPersonGraph } from "@/content/json-ld";
import { defaultSkin, skinIds } from "@/skins/config";
import { defaultPane, paneIds } from "@/content/panes";
import { LocalePersist } from "@/components/locale-persist";
import "@/app/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Only the Terminal and CRT skins use it, so it stays off the critical path.
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  preload: false,
});

// Each of these belongs to one or two skins only, so none of them is preloaded:
// the browser fetches a face when a rule that uses it actually applies.
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument",
  display: "swap",
  preload: false,
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk-face",
  display: "swap",
  preload: false,
});

const vt323 = VT323({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-vt323",
  display: "swap",
  preload: false,
});

export const dynamicParams = false;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f2ee" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0c" },
  ],
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) {
    return {};
  }
  const dict = getDictionary(locale);
  return {
    metadataBase: new URL("https://jlmjr-dev.github.io"),
    title: dict.meta.title,
    description: dict.meta.description,
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "32x32" },
        { url: "/favicon.svg", type: "image/svg+xml" },
      ],
    },
    alternates: {
      canonical: `/${locale}/`,
      languages: { en: "/en/", "pt-BR": "/pt/", "x-default": "/en/" },
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: `/${locale}/`,
      siteName: "José Luiz Monteiro Junior",
      locale: locale === "pt" ? "pt_BR" : "en_US",
      type: "website",
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: "José Luiz Monteiro Junior, Senior Full-Stack Software Engineer",
        },
      ],
    },
  };
}

/* Restores skin, theme and the open tab before the first paint, so a refresh
   or a language switch lands exactly where the visitor left off. */
const appearanceInitScript = `(function () {
  var root = document.documentElement;
  var skins = ${JSON.stringify(skinIds)};
  var tabs = ${JSON.stringify(paneIds)};
  var skin = ${JSON.stringify(defaultSkin)};
  var tab = ${JSON.stringify(defaultPane)};
  var theme = null;
  try {
    var storedSkin = localStorage.getItem("skin");
    if (skins.indexOf(storedSkin) !== -1) {
      skin = storedSkin;
    }
    var storedTab = localStorage.getItem("tab");
    if (tabs.indexOf(storedTab) !== -1) {
      tab = storedTab;
    }
    theme = localStorage.getItem("theme");
  } catch (error) {}
  root.dataset.skin = skin;
  root.dataset.tab = tab;
  var dark = theme
    ? theme === "dark"
    : !window.matchMedia("(prefers-color-scheme: light)").matches;
  root.classList.toggle("dark", dark);
})();`;

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  const dict = getDictionary(locale);

  return (
    <html
      lang={locale === "pt" ? "pt-BR" : "en"}
      data-skin={defaultSkin}
      data-tab={defaultPane}
      className={`dark ${inter.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable} ${spaceGrotesk.variable} ${vt323.variable}`}
      suppressHydrationWarning
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: appearanceInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildPersonGraph(locale, dict)),
          }}
        />
        <LocalePersist locale={locale} />
        {children}
      </body>
    </html>
  );
}
