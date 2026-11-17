"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Product } from "@/lib/schema";

type CatalogContextValue = {
  products: Product[];
  setProducts: (products: Product[]) => void;
  activeProduct: Product | null;
  openProduct: (product: Product) => void;
  closeProduct: () => void;
};

const CatalogContext = createContext<CatalogContextValue | null>(null);

export function CatalogProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  const openProduct = useCallback((product: Product) => {
    setActiveProduct(product);
  }, []);

  const closeProduct = useCallback(() => {
    setActiveProduct(null);
  }, []);

  const value = useMemo(
    () => ({
      products,
      setProducts,
      activeProduct,
      openProduct,
      closeProduct,
    }),
    [products, activeProduct, openProduct, closeProduct],
  );

  return (
    <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>
  );
}

export function useCatalog() {
  const ctx = useContext(CatalogContext);
  if (!ctx) {
    throw new Error("useCatalog must be used within CatalogProvider");
  }
  return ctx;
}

export function CatalogSync({ products }: { products: Product[] }) {
  const { setProducts } = useCatalog();

  useEffect(() => {
    setProducts(products);
  }, [products, setProducts]);

  return null;
}
