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
      Cart
      {count > 0 ? <span className="cart-count">{count}</span> : null}
    </button>
  );
}
