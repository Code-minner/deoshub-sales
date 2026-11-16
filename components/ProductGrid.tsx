"use client";

import Image from "next/image";
import { useState } from "react";
import { discountPercent } from "@/lib/sale";
import { buildWhatsAppUrl, formatNaira } from "@/lib/whatsapp";
import type { Product } from "@/lib/schema";
import { useCart } from "./CartProvider";
import { IconCart, IconCheck, IconWhatsApp } from "./Icons";

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

  const discount = discountPercent(product.price, product.compareAtPrice);
  const hasSlash = discount > 0;

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
          <span className="sale-tag flash-badge">{discount}% OFF</span>
        ) : (
          <span className="product-card-chip">{product.category}</span>
        )}
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
          {hasSlash ? (
            <em className="discount-pill">{discount}% off</em>
          ) : null}
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
            src="/images/logo-deos.png"
            alt="Deo's Hub"
            fill
            sizes="320px"
            className="object-cover"
          />
        </div>
        <p className="eyebrow dark">The Scent Affair</p>
        <h3>Sale items loading soon</h3>
        <p>
          Products will appear here once admin uploads them. Message us on
          WhatsApp meanwhile.
        </p>
        <a
          href={buildWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="order-btn"
        >
          <IconWhatsApp size={15} />
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
