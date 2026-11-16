"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { formatNaira } from "@/lib/whatsapp";
import type { Product } from "@/lib/schema";

type Props = {
  initialProducts: Product[];
};

type FormState = {
  name: string;
  description: string;
  price: string;
  compareAtPrice: string;
  category: string;
  stock: string;
};

const emptyForm: FormState = {
  name: "",
  description: "",
  price: "",
  compareAtPrice: "",
  category: "Perfume",
  stock: "1",
};

export function AdminDashboard({ initialProducts }: Props) {
  const router = useRouter();
  const [products, setProducts] = useState(initialProducts);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!file) {
      setError("Please choose a product image");
      return;
    }

    setBusy(true);
    try {
      const uploadData = new FormData();
      uploadData.append("file", file);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      });
      const uploaded = await uploadRes.json();
      if (!uploadRes.ok) {
        throw new Error(uploaded.error || "Upload failed");
      }

      const createRes = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          imageUrl: uploaded.url,
          imagePublicId: uploaded.publicId,
        }),
      });
      const created = await createRes.json();
      if (!createRes.ok) {
        throw new Error(created.error || "Could not save product");
      }

      setProducts((prev) => [created.product, ...prev]);
      setForm(emptyForm);
      setFile(null);
      setPreview(null);
      setMessage("Product published to the storefront");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  async function removeProduct(id: string) {
    if (!confirm("Delete this product?")) return;
    setError(null);
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Delete failed");
      return;
    }
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setMessage("Product removed");
    router.refresh();
  }

  return (
    <div className="admin-shell">
      <header className="admin-top">
        <div>
          <p className="text-sm tracking-[0.25em] uppercase text-[var(--gold)]">
            Deo&apos;s Hub
          </p>
          <h1 className="font-display text-3xl text-white">Admin</h1>
        </div>
        <div className="flex items-center gap-3">
          <a href="/" className="admin-ghost">
            View store
          </a>
          <button type="button" onClick={logout} className="admin-ghost">
            Log out
          </button>
        </div>
      </header>

      <div className="admin-grid">
        <section className="admin-panel">
          <h2 className="font-display text-2xl text-[var(--ink)]">
            Upload perfume
          </h2>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Image goes to Cloudinary. Details save to Neon.
          </p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <label className="admin-field">
              <span>Name</span>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Velvet Noir"
              />
            </label>

            <label className="admin-field">
              <span>Description</span>
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                placeholder="Notes, vibe, size..."
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="admin-field">
                <span>Selling price (₦)</span>
                <input
                  required
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  placeholder="25000"
                />
              </label>
              <label className="admin-field">
                <span>Old / slashed price (₦)</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.compareAtPrice}
                  onChange={(e) =>
                    setForm({ ...form, compareAtPrice: e.target.value })
                  }
                  placeholder="35000"
                />
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="admin-field">
                <span>Category</span>
                <input
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                />
              </label>
              <label className="admin-field">
                <span>Stock</span>
                <input
                  type="number"
                  min="0"
                  value={form.stock}
                  onChange={(e) => setForm({ ...form, stock: e.target.value })}
                />
              </label>
            </div>

            <label className="admin-field">
              <span>Product image</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const next = e.target.files?.[0] ?? null;
                  setFile(next);
                  setPreview(next ? URL.createObjectURL(next) : null);
                }}
              />
            </label>

            {preview ? (
              <div className="relative h-48 w-full overflow-hidden rounded-md bg-[var(--plum-deep)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={preview}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
              </div>
            ) : null}

            {error ? <p className="text-sm text-red-700">{error}</p> : null}
            {message ? (
              <p className="text-sm text-emerald-700">{message}</p>
            ) : null}

            <button type="submit" className="admin-primary" disabled={busy}>
              {busy ? "Publishing..." : "Publish product"}
            </button>
          </form>
        </section>

        <section className="admin-panel">
          <h2 className="font-display text-2xl text-[var(--ink)]">
            Catalog ({products.length})
          </h2>
          <div className="mt-6 space-y-4">
            {products.length === 0 ? (
              <p className="text-sm text-[var(--muted)]">
                No products yet. Upload your first scent.
              </p>
            ) : (
              products.map((product) => (
                <div key={product.id} className="admin-row">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-[var(--plum-deep)]">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-[var(--ink)]">
                      {product.name}
                    </p>
                    <p className="text-sm text-[var(--brand)]">
                      {product.compareAtPrice ? (
                        <>
                          <s className="mr-2 text-[var(--muted)]">
                            {formatNaira(product.compareAtPrice)}
                          </s>
                          {formatNaira(product.price)}
                        </>
                      ) : (
                        formatNaira(product.price)
                      )}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="admin-danger"
                    onClick={() => removeProduct(product.id)}
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
