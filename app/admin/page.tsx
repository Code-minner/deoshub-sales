import { Suspense } from "react";
import { AdminDashboard } from "@/components/AdminDashboard";
import { listProducts } from "@/lib/products";

async function AdminContent() {
  let products: Awaited<ReturnType<typeof listProducts>> = [];
  try {
    products = await listProducts();
  } catch {
    products = [];
  }

  return <AdminDashboard initialProducts={products} />;
}

export default function AdminPage() {
  return (
    <Suspense
      fallback={
        <div className="admin-shell">
          <header className="admin-top">
            <div>
              <p className="text-sm tracking-[0.25em] uppercase text-[var(--gold)]">
                Deo&apos;s Hub
              </p>
              <h1 className="font-display text-3xl text-white">Admin</h1>
            </div>
          </header>
          <div className="admin-panel">
            <p className="text-sm text-[var(--muted)]">Loading catalog...</p>
          </div>
        </div>
      }
    >
      <AdminContent />
    </Suspense>
  );
}
