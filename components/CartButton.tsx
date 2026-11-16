"use client";

import { useCart } from "./CartProvider";

export function CartButton({ className = "" }: { className?: string }) {
  const { count, setOpen } = useCart();

  return (
    <button
      type="button"
      className={`cart-trigger ${className}`.trim()}
      onClick={() => setOpen(true)}
      aria-label={`Open cart, ${count} items`}
    >
      <svg
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M6 6h15l-1.5 9h-12z" />
        <path d="M6 6 5 3H2" />
        <circle cx="9" cy="20" r="1" fill="currentColor" stroke="none" />
        <circle cx="18" cy="20" r="1" fill="currentColor" stroke="none" />
      </svg>
      {count > 0 ? <span className="cart-count">{count}</span> : null}
    </button>
  );
}
