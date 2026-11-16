import { SALE } from "./sale";

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

export type CartOrderItem = {
  name: string;
  price: string | number;
  quantity: number;
};

export function buildWhatsAppUrl(
  productName?: string,
  price?: string | number,
) {
  const lines = ["Hello Deo's Hub,", "", `Re: ${SALE.title}`];

  if (productName) {
    const priceText =
      price !== undefined ? ` (${formatNaira(price)})` : "";
    lines.push("", `I want to order: ${productName}${priceText}`);
  } else {
    lines.push("", "I want to place an order from The Scent Affair sale.");
  }

  lines.push("", "Please confirm availability. Thank you.");
  return toWhatsAppLink(lines.join("\n"));
}

export function buildCartWhatsAppUrl(items: CartOrderItem[]) {
  const lines = [
    "Hello Deo's Hub,",
    "",
    `Re: ${SALE.title}`,
    "",
    "I want to order:",
  ];

  let total = 0;
  for (const item of items) {
    const unit = Number(item.price);
    const lineTotal = (Number.isNaN(unit) ? 0 : unit) * item.quantity;
    total += lineTotal;
    lines.push(
      `- ${item.name} x${item.quantity} = ${formatNaira(lineTotal)}`,
    );
  }

  lines.push("", `Total: ${formatNaira(total)}`);
  lines.push("", "Please confirm availability. Thank you.");
  return toWhatsAppLink(lines.join("\n"));
}

function toWhatsAppLink(message: string) {
  const number = (
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || SALE.whatsappNumber
  ).replace(/\D/g, "");

  if (!number) {
    return `https://wa.me/?text=${encodeURIComponent(message)}`;
  }

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
