import { connection } from "next/server";
import { listProducts } from "@/lib/products";
import { ProductGrid } from "./ProductGrid";

export async function StorefrontProducts() {
  await connection();

  try {
    const products = await listProducts();
    return <ProductGrid products={products} />;
  } catch {
    return (
      <div className="mx-auto max-w-xl py-16 text-center">
        <p className="font-display text-2xl text-[var(--brand)]">
          Catalog temporarily unavailable
        </p>
        <p className="mt-3 text-[var(--muted)]">
          Connect Neon and push the schema, then refresh this page.
        </p>
      </div>
    );
  }
}
