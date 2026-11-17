"use client";

import { CartDrawer } from "./CartDrawer";
import { CartProvider } from "./CartProvider";
import { CatalogProvider } from "./CatalogProvider";
import { ProductModal } from "./ProductModal";
import { SearchProvider } from "./SearchProvider";

export function StoreShell({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <CatalogProvider>
        <SearchProvider>
          {children}
          <ProductModal />
          <CartDrawer />
        </SearchProvider>
      </CatalogProvider>
    </CartProvider>
  );
}
