export const skinIds = [
  "modern",
  "editorial",
  "swiss",
  "brutalist",
  "blueprint",
  "cyberpunk",
  "terminal",
  "crt",
] as const;

export type SkinId = (typeof skinIds)[number];

export const defaultSkin: SkinId = "modern";

export function isSkin(value: string): value is SkinId {
  return (skinIds as readonly string[]).includes(value);
}
