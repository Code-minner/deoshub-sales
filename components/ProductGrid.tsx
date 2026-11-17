"use client";

import Image from "next/image";
import { type MouseEvent, useMemo, useState } from "react";
import { PRODUCT_CATEGORIES, normalizeCategory } from "@/lib/categories";
import { discountPercent } from "@/lib/sale";
import { buildWhatsAppUrl, formatNaira } from "@/lib/whatsapp";
import type { Product } from "@/lib/schema";
import { useCart } from "./CartProvider";
import { useCatalog } from "./CatalogProvider";
import { IconCart, IconCheck, IconWhatsApp } from "./Icons";
import { useSearch } from "./SearchProvider";

type Props = {
  products: Product[];
};

type Filter = "All" | (typeof PRODUCT_CATEGORIES)[number];

function ProductCard({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  const { addItem } = useCart();
  const { openProduct } = useCatalog();
  const [added, setAdded] = useState(false);

  const discount = discountPercent(product.price, product.compareAtPrice);
  const hasSlash = discount > 0;
  const displayName = product.subname
    ? `${product.name} · ${product.subname}`
    : product.name;

  function handleAdd(e: MouseEvent) {
    e.stopPropagation();
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
    <article
      className="product-card is-clickable"
      style={{ animationDelay: `${Math.min(index, 8) * 50}ms` }}
      onClick={() => openProduct(product)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openProduct(product);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`View ${product.name}`}
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
          <span className="product-card-chip">
            {normalizeCategory(product.category)}
          </span>
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
        <p className="product-card-cat">
          {normalizeCategory(product.category)}
        </p>
        <h3>{product.name}</h3>
        {product.subname ? (
          <p className="product-card-subname">{product.subname}</p>
        ) : null}
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
  const [filter, setFilter] = useState<Filter>("All");
  const { query } = useSearch();

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return products.filter((product) => {
      const categoryOk =
        filter === "All" || normalizeCategory(product.category) === filter;
      if (!categoryOk) return false;
      if (!needle) return true;
      const haystack = [
        product.name,
        product.subname,
        product.description,
        product.category,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(needle);
    });
  }, [filter, products, query]);

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
          className="order-btn wa-btn"
        >
          <IconWhatsApp size={15} />
          Chat on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <div>
      <div className="category-tabs" role="tablist" aria-label="Product categories">
        <button
          type="button"
          className={filter === "All" ? "is-active" : ""}
          onClick={() => setFilter("All")}
        >
          All
        </button>
        {PRODUCT_CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            className={filter === category ? "is-active" : ""}
            onClick={() => setFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {query.trim() ? (
        <p className="search-result-note">
          Showing results for &ldquo;{query.trim()}&rdquo;
        </p>
      ) : null}

      {filtered.length === 0 ? (
        <p className="category-empty">
          {query.trim()
            ? `No products match “${query.trim()}”.`
            : `No products in ${filter} yet.`}
        </p>
      ) : (
        <div className="shop-grid">
          {filtered.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
