"use client";

import Image from "next/image";
import { useState } from "react";
import { buildWhatsAppUrl, formatNaira } from "@/lib/whatsapp";
import type { Product } from "@/lib/schema";
import { useCart } from "./CartProvider";

type Props = {
  products: Product[];
};

function ProductCard({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const hasSlash =
    !!product.compareAtPrice &&
    Number(product.compareAtPrice) > Number(product.price);

  const discount = hasSlash
    ? Math.round(
        ((Number(product.compareAtPrice) - Number(product.price)) /
          Number(product.compareAtPrice)) *
          100,
      )
    : 0;

  function handleAdd() {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      imageUrl: product.imageUrl,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  }

  return (
    <article
      className="product-card"
      style={{ animationDelay: `${Math.min(index, 8) * 50}ms` }}
    >
      <div className="product-card-media">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 240px"
          className="object-cover"
        />
        <div className="product-card-shade" aria-hidden />
        {hasSlash ? (
          <span className="sale-tag">-{discount}%</span>
        ) : (
          <span className="product-card-chip">{product.category}</span>
        )}
        <button
          type="button"
          className={`add-cart-btn ${added ? "is-added" : ""}`}
          onClick={handleAdd}
        >
          {added ? (
            "Added"
          ) : (
            <>
              <svg
                viewBox="0 0 24 24"
                width="15"
                height="15"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M6 6h15l-1.5 9h-12z" />
                <path d="M6 6 5 3H2" />
                <circle cx="9" cy="20" r="1" fill="currentColor" stroke="none" />
                <circle
                  cx="18"
                  cy="20"
                  r="1"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
              Add to cart
            </>
          )}
        </button>
      </div>

      <div className="product-card-body">
        <p className="product-card-cat">{product.category}</p>
        <h3>{product.name}</h3>
        {product.description ? (
          <p className="product-card-note">{product.description}</p>
        ) : null}
        <div className="product-card-prices">
          {hasSlash ? <s>{formatNaira(product.compareAtPrice!)}</s> : null}
          <strong>{formatNaira(product.price)}</strong>
        </div>
      </div>
    </article>
  );
}

export function ProductGrid({ products }: Props) {
  if (products.length === 0) {
    return (
      <div className="archive-empty">
        <div className="archive-empty-frame">
          <Image
            src="/images/perfume-feature.jpg"
            alt="Perfume bottle preview"
            fill
            sizes="320px"
            className="object-cover"
          />
        </div>
        <p className="eyebrow dark">Collection</p>
        <h3>Scents arriving soon</h3>
        <p>
          New perfumes are being curated. Check back shortly, or message us on
          WhatsApp to ask what is available now.
        </p>
        <a
          href={buildWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="order-btn"
        >
          Chat on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <div className="shop-grid">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
}
