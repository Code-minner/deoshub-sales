export function formatNaira(price: string | number) {
  const value = typeof price === "string" ? Number(price) : price;
  if (Number.isNaN(value)) return String(price);
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}

export function buildWhatsAppUrl(
  productName?: string,
  price?: string | number,
) {
  const number = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "").replace(
    /\D/g,
    "",
  );

  const lines = ["Hello Deo's Hub,"];

  if (productName) {
    const priceText =
      price !== undefined ? ` (${formatNaira(price)})` : "";
    lines.push("", `I want to order: ${productName}${priceText}`);
  } else {
    lines.push("", "I want to place an order / ask about your perfumes.");
  }

  lines.push("", "Please confirm availability. Thank you.");

  const message = lines.join("\n");

  if (!number) {
    return `https://wa.me/?text=${encodeURIComponent(message)}`;
  }

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
