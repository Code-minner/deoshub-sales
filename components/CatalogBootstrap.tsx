import { connection } from "next/server";
import { listProducts } from "@/lib/products";
import { CatalogSync } from "./CatalogProvider";

export async function CatalogBootstrap() {
  await connection();

  try {
    const products = await listProducts();
    return <CatalogSync products={products} />;
  } catch {
    return null;
  }
}
