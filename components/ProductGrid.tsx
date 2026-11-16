"use client";

import Image from "next/image";
import { buildWhatsAppUrl, formatNaira } from "@/lib/whatsapp";
import type { Product } from "@/lib/schema";

type Props = {
  products: Product[];
};

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
    <div className="archive-grid">
      {products.map((product, index) => {
        const wa = buildWhatsAppUrl(product.name, product.price);
        const featured = index % 5 === 0;

        return (
          <article
            key={product.id}
            className={`scent ${featured ? "scent-feature" : ""}`}
            style={{ animationDelay: `${Math.min(index, 6) * 70}ms` }}
          >
            <div className="scent-media">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
              <span className="scent-badge">{product.category}</span>
            </div>
            <div className="scent-meta">
              <div>
                <h3>{product.name}</h3>
                {product.description ? (
                  <p className="scent-note">{product.description}</p>
                ) : null}
              </div>
              <div className="scent-foot">
                <p className="scent-price">{formatNaira(product.price)}</p>
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="order-btn"
                >
                  Order on WhatsApp
                </a>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
