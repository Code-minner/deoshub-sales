"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { normalizeCategory } from "@/lib/categories";
import { discountPercent } from "@/lib/sale";
import { buildWhatsAppUrl, formatNaira } from "@/lib/whatsapp";
import { useCart } from "./CartProvider";
import { useCatalog } from "./CatalogProvider";
import { IconCart, IconCheck, IconClose, IconWhatsApp } from "./Icons";

export function ProductModal() {
  const { activeProduct, closeProduct } = useCatalog();
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!activeProduct) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeProduct();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [activeProduct, closeProduct]);

  useEffect(() => {
    setAdded(false);
  }, [activeProduct?.id]);

  if (!activeProduct) return null;

  const product = activeProduct;
  const discount = discountPercent(product.price, product.compareAtPrice);
  const hasSlash = discount > 0;
  const displayName = product.subname
    ? `${product.name} · ${product.subname}`
    : product.name;
  const waUrl = buildWhatsAppUrl(displayName, product.price);

  function handleAdd() {
    addItem({
      id: product.id,
      name: displayName,
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      imageUrl: product.imageUrl,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  }

  return (
    <div
      className="product-modal-root"
      role="dialog"
      aria-modal="true"
      aria-label={product.name}
    >
      <button
        type="button"
        className="product-modal-backdrop"
        aria-label="Close product"
        onClick={closeProduct}
      />
      <div className="product-modal">
        <button
          type="button"
          className="product-modal-close"
          aria-label="Close"
          onClick={closeProduct}
        >
          <IconClose size={18} />
        </button>

        <div className="product-modal-media">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 720px) 100vw, 420px"
            className="object-cover"
            priority
          />
          {hasSlash ? (
            <span className="sale-tag flash-badge">{discount}% OFF</span>
          ) : null}
        </div>

        <div className="product-modal-body">
          <p className="product-card-cat">
            {normalizeCategory(product.category)}
          </p>
          <h2>{product.name}</h2>
          {product.subname ? (
            <p className="product-card-subname">{product.subname}</p>
          ) : null}

          <div className="product-card-prices product-modal-prices">
            {hasSlash ? <s>{formatNaira(product.compareAtPrice!)}</s> : null}
            <strong>{formatNaira(product.price)}</strong>
            {hasSlash ? (
              <em className="discount-pill">{discount}% off</em>
            ) : null}
          </div>

          {product.description ? (
            <p className="product-modal-desc">{product.description}</p>
          ) : (
            <p className="product-modal-desc">
              Available in The Scent Affair sale. Add to cart or order now on
              WhatsApp.
            </p>
          )}

          <div className="product-modal-actions">
            <button
              type="button"
              className={`add-cart-btn ${added ? "is-added" : ""}`}
              onClick={handleAdd}
            >
              {added ? (
                <>
                  <IconCheck size={15} />
                  Added
                </>
              ) : (
                <>
                  <IconCart size={15} />
                  Add to cart
                </>
              )}
            </button>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="wa-btn"
            >
              <IconWhatsApp size={16} />
              Order on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
