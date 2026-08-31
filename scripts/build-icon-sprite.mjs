/* Builds public/brand-icons.svg from the slugs used in src/content/skills.ts.
   Inlining ~30 Simple Icons paths costs about 80 KB of HTML once Next has
   duplicated them into the RSC payload, so they live in one cached sprite
   instead and the markup only carries a short <use> reference. */
import { readFileSync, writeFileSync } from "node:fs";
import * as icons from "simple-icons";

const source = readFileSync("src/content/skills.ts", "utf8");
const slugs = [...new Set([...source.matchAll(/slug: "([^"]+)"/g)].map((m) => m[1]))];

const symbols = slugs.map((slug) => {
  const key = `si${slug.charAt(0).toUpperCase()}${slug.slice(1)}`;
  const icon = icons[key];
  if (!icon) {
    throw new Error(`Unknown Simple Icons slug "${slug}" (expected export ${key})`);
  }
  return `<symbol id="${slug}" viewBox="0 0 24 24"><path d="${icon.path}"/></symbol>`;
});

writeFileSync(
  "public/brand-icons.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" style="display:none">${symbols.join("")}</svg>\n`,
);

console.log(`brand-icons.svg: ${slugs.length} symbols`);
