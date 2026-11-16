import { connection } from "next/server";
import { AdminDashboard } from "@/components/AdminDashboard";
import { listProducts } from "@/lib/products";

export default async function AdminPage() {
  await connection();

  let products: Awaited<ReturnType<typeof listProducts>> = [];
  try {
    products = await listProducts();
  } catch {
    products = [];
  }

  return <AdminDashboard initialProducts={products} />;
}
