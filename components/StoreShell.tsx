"use client";

import { CartDrawer } from "./CartDrawer";
import { CartProvider } from "./CartProvider";

export function StoreShell({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {children}
      <CartDrawer />
    </CartProvider>
  );
}
