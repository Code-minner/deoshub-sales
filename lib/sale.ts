export const SALE = {
  title: "The Scent Affair",
  tagline: "Only sales of the year",
  slogan: "Smell Like Luxury, Pay Less...",
  dates: "27th Nov – 1st Dec",
  delivery: "Delivery commence on Dec 3rd",
  whatsappDisplay: "09161848921",
  whatsappNumber: "2349161848921",
  offers: ["Discounts", "Combo Deals", "Freebies"],
  /** Midnight West Africa Time on 27 Nov 2026 */
  opensAt: "2026-11-27T00:00:00+01:00",
  closesAt: "2026-12-02T00:00:00+01:00",
} as const;

export function getSaleOpensAt() {
  return new Date(SALE.opensAt);
}

export function isSaleOpen(now: Date) {
  return now.getTime() >= getSaleOpensAt().getTime();
}

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
