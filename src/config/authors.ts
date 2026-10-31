export const authors = [
  "Mateusz Duda",
] as const;

export type Category = (typeof authors)[number];

export const authorSlug = (category: string) =>
  category
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

/** One line per category, shown on its archive page and in listings. */
export const authorDescription: Record<Category, string> = {
  ["Mateusz Duda"]: "Some random guy doing various things",
};
