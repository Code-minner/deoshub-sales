export const PRODUCT_CATEGORIES = [
  "Combos",
  "Sprays",
  "Mini perfume",
  "Perfume",
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

export function isProductCategory(value: string): value is ProductCategory {
  return (PRODUCT_CATEGORIES as readonly string[]).includes(value);
}

/** Maps legacy labels like EDP onto the current category list. */
export function normalizeCategory(value: string): ProductCategory {
  if (value === "EDP" || value === "Perfume") return "Perfume";
  if (isProductCategory(value)) return value;
  return "Perfume";
}
