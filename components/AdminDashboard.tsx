"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { discountPercent } from "@/lib/sale";
import { formatNaira } from "@/lib/whatsapp";
import type { Product } from "@/lib/schema";
import {
  IconClose,
  IconExternal,
  IconLogout,
  IconTrash,
  IconUpload,
} from "./Icons";

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

function toForm(product: Product): FormState {
  return {
    name: product.name,
    description: product.description ?? "",
    price: String(product.price ?? ""),
    compareAtPrice: product.compareAtPrice
      ? String(product.compareAtPrice)
      : "",
    category: product.category || "Perfume",
    stock: String(product.stock ?? 1),
  };
}

export function AdminDashboard({ initialProducts }: Props) {
  const router = useRouter();
  const [products, setProducts] = useState(initialProducts);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const liveDiscount = useMemo(
    () => discountPercent(form.price || 0, form.compareAtPrice || null),
    [form.price, form.compareAtPrice],
  );

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  function startEdit(product: Product) {
    setEditingId(product.id);
    setForm(toForm(product));
    setFile(null);
    setPreview(product.imageUrl);
    setError(null);
    setMessage(`Editing ${product.name}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
    setFile(null);
    setPreview(null);
    setMessage(null);
    setError(null);
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!editingId && !file) {
      setError("Please choose a product image");
      return;
    }

    setBusy(true);
    try {
      let imageUrl: string | undefined;
      let imagePublicId: string | undefined;

      if (file) {
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
        imageUrl = uploaded.url;
        imagePublicId = uploaded.publicId;
      }

      if (editingId) {
        const patchRes = await fetch(`/api/products/${editingId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...form,
            ...(imageUrl ? { imageUrl, imagePublicId } : {}),
          }),
        });
        const patched = await patchRes.json();
        if (!patchRes.ok) {
          throw new Error(patched.error || "Could not update product");
        }
        setProducts((prev) =>
          prev.map((p) => (p.id === editingId ? patched.product : p)),
        );
        setMessage("Product updated");
        cancelEdit();
      } else {
        const createRes = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...form,
            imageUrl,
            imagePublicId,
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
      }

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
    if (editingId === id) cancelEdit();
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
            <IconExternal size={15} />
            View store
          </a>
          <button type="button" onClick={logout} className="admin-ghost">
            <IconLogout size={15} />
            Log out
          </button>
        </div>
      </header>

      <div className="admin-grid">
        <section className="admin-panel">
          <div className="admin-panel-head">
            <div>
              <h2 className="font-display text-2xl text-[var(--ink)]">
                {editingId ? "Edit product" : "Upload perfume"}
              </h2>
              <p className="mt-1 text-sm text-[var(--muted)]">
                Set selling price and old price. Discount % is calculated
                automatically.
              </p>
            </div>
            {editingId ? (
              <button
                type="button"
                className="admin-ghost dark"
                onClick={cancelEdit}
              >
                <IconClose size={15} />
                Cancel
              </button>
            ) : null}
          </div>

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

            {liveDiscount > 0 ? (
              <p className="admin-discount-preview">
                Shoppers will see <strong>{liveDiscount}% OFF</strong>
              </p>
            ) : (
              <p className="text-sm text-[var(--muted)]">
                Add an old price higher than selling price to show a discount
                badge.
              </p>
            )}

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
              <span>
                Product image {editingId ? "(optional while editing)" : ""}
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const next = e.target.files?.[0] ?? null;
                  setFile(next);
                  setPreview(next ? URL.createObjectURL(next) : preview);
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
              <IconUpload size={15} />
              {busy
                ? editingId
                  ? "Saving..."
                  : "Publishing..."
                : editingId
                  ? "Save changes"
                  : "Publish product"}
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
              products.map((product) => {
                const off = discountPercent(
                  product.price,
                  product.compareAtPrice,
                );
                return (
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
                            {off > 0 ? (
                              <span className="ml-2 text-xs uppercase tracking-wide">
                                {off}% off
                              </span>
                            ) : null}
                          </>
                        ) : (
                          formatNaira(product.price)
                        )}
                      </p>
                    </div>
                    <div className="admin-row-actions">
                      <button
                        type="button"
                        className="admin-edit"
                        onClick={() => startEdit(product)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="admin-danger"
                        onClick={() => removeProduct(product.id)}
                      >
                        <IconTrash size={14} />
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
