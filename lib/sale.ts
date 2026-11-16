export const SALE = {
  title: "The Scent Affair",
  tagline: "Only sales of the year",
  slogan: "Smell Like Luxury, Pay Less...",
  dates: "27th Nov – 1st Dec",
  delivery: "Delivery commence on Dec 3rd",
  whatsappDisplay: "09161848921",
  whatsappNumber: "2349161848921",
  offers: ["Discounts", "Combo Deals", "Freebies"],
} as const;

export function discountPercent(
  price: string | number,
  compareAtPrice: string | number | null | undefined,
) {
  if (compareAtPrice == null || compareAtPrice === "") return 0;
  const sell = Number(price);
  const was = Number(compareAtPrice);
  if (!Number.isFinite(sell) || !Number.isFinite(was) || was <= sell || was <= 0) {
    return 0;
  }
  return Math.round(((was - sell) / was) * 100);
}
