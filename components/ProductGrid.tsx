"use client";

import Image from "next/image";
import { buildWhatsAppUrl, formatNaira } from "@/lib/whatsapp";
import type { Product } from "@/lib/schema";
import { useCart } from "./CartProvider";

type Props = {
  products: Product[];
};

export function ProductGrid({ products }: Props) {
  const { addItem } = useCart();

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
      {products.map((product, index) => {
        const hasSlash =
          product.compareAtPrice &&
          Number(product.compareAtPrice) > Number(product.price);

        return (
          <article
            key={product.id}
            className="product-card"
            style={{ animationDelay: `${Math.min(index, 8) * 50}ms` }}
          >
            <div className="product-card-media">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 220px"
                className="object-cover"
              />
              {hasSlash ? <span className="sale-tag">Sale</span> : null}
            </div>

            <div className="product-card-body">
              <p className="product-card-cat">{product.category}</p>
              <h3>{product.name}</h3>
              <div className="product-card-prices">
                {hasSlash ? (
                  <s>{formatNaira(product.compareAtPrice!)}</s>
                ) : null}
                <strong>{formatNaira(product.price)}</strong>
              </div>
              <button
                type="button"
                className="add-cart-btn"
                onClick={() =>
                  addItem({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    compareAtPrice: product.compareAtPrice,
                    imageUrl: product.imageUrl,
                  })
                }
              >
                Add to cart
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}
