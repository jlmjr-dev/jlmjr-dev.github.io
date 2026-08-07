import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { LocalePersist } from "@/components/locale-persist";
import { RorschachBg } from "@/components/three/rorschach-bg";
import "@/app/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const dynamicParams = false;

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
      languages: { en: "/en/", "pt-BR": "/pt/" },
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: `/${locale}/`,
      siteName: "José Luiz Monteiro Junior",
      locale: locale === "pt" ? "pt_BR" : "en_US",
      type: "website",
      images: ["/og.png"],
    },
  };
}

const themeInitScript = `(function () {
  document.documentElement.classList.add("js");
  try {
    var stored = localStorage.getItem("theme");
    var dark = stored ? stored === "dark" : !window.matchMedia("(prefers-color-scheme: light)").matches;
    document.documentElement.classList.toggle("dark", dark);
  } catch (error) {
    document.documentElement.classList.add("dark");
  }
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
      className={`dark ${inter.variable}`}
      suppressHydrationWarning
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <LocalePersist locale={locale} />
        <RorschachBg />
        <Header locale={locale} dict={dict} />
        {children}
        <Footer dict={dict} />
      </body>
    </html>
  );
}
