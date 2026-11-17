"use client";

import Image from "next/image";
import { buildCartWhatsAppUrl, formatNaira } from "@/lib/whatsapp";
import { useCart } from "./CartProvider";
import {
  IconClose,
  IconMinus,
  IconPlus,
  IconTrash,
  IconWhatsApp,
} from "./Icons";

export function CartDrawer() {
  const { items, open, setOpen, total, updateQty, removeItem, clear } =
    useCart();

  if (!open) return null;

  const checkoutUrl = buildCartWhatsAppUrl(
    items.map((item) => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    })),
  );

  return (
    <div className="cart-root" role="dialog" aria-modal="true" aria-label="Cart">
      <button
        type="button"
        className="cart-backdrop"
        aria-label="Close cart"
        onClick={() => setOpen(false)}
      />
      <aside className="cart-panel">
        <header className="cart-head">
          <div>
            <p className="eyebrow dark">Your cart</p>
            <h2>Selected scents</h2>
          </div>
          <button
            type="button"
            className="cart-icon-btn"
            aria-label="Close cart"
            onClick={() => setOpen(false)}
          >
            <IconClose size={18} />
          </button>
        </header>

        {items.length === 0 ? (
          <p className="cart-empty">Your cart is empty. Add a perfume to begin.</p>
        ) : (
          <>
            <ul className="cart-list">
              {items.map((item) => (
                <li key={item.id} className="cart-item">
                  <div className="cart-thumb">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div className="cart-item-body">
                    <div className="cart-item-top">
                      <p className="cart-item-name">{item.name}</p>
                      <button
                        type="button"
                        className="cart-icon-btn subtle"
                        aria-label={`Remove ${item.name}`}
                        onClick={() => removeItem(item.id)}
                      >
                        <IconTrash size={15} />
                      </button>
                    </div>
                    <div className="cart-item-prices">
                      {item.compareAtPrice ? (
                        <s>{formatNaira(item.compareAtPrice)}</s>
                      ) : null}
                      <span>{formatNaira(item.price)}</span>
                    </div>
                    <div className="cart-qty">
                      <button
                        type="button"
                        className="cart-qty-btn"
                        aria-label="Decrease quantity"
                        onClick={() => updateQty(item.id, item.quantity - 1)}
                      >
                        <IconMinus />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        className="cart-qty-btn"
                        aria-label="Increase quantity"
                        onClick={() => updateQty(item.id, item.quantity + 1)}
                      >
                        <IconPlus />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="cart-foot">
              <div className="cart-total">
                <span>Total</span>
                <strong>{formatNaira(total)}</strong>
              </div>
              <a
                href={checkoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="wa-btn cart-checkout"
                onClick={() => clear()}
              >
                <IconWhatsApp size={16} />
                Checkout on WhatsApp
              </a>
              <button
                type="button"
                className="cart-clear"
                onClick={() => clear()}
              >
                <IconTrash size={14} />
                Clear cart
              </button>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
