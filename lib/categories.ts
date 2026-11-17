export const PRODUCT_CATEGORIES = [
  "Combos",
  "Sprays",
  "Mini perfume",
  "EDP",
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

export function isProductCategory(value: string): value is ProductCategory {
  return (PRODUCT_CATEGORIES as readonly string[]).includes(value);
}
