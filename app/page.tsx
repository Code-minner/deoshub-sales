import Image from "next/image";
import { Suspense } from "react";
import { StorefrontProducts } from "@/components/StorefrontProducts";
import { StoreHeader } from "@/components/StoreHeader";
import { StoreShell } from "@/components/StoreShell";
import { SALE } from "@/lib/sale";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

function ProductsFallback() {
  return (
    <div className="shop-skeleton" aria-hidden>
      <div className="skel compact" />
      <div className="skel compact" />
      <div className="skel compact" />
      <div className="skel compact" />
    </div>
  );
}

export default function Home() {
  const generalWhatsApp = buildWhatsAppUrl();

  return (
    <StoreShell>
      <div className="maison sale-site">
        <div className="sale-ticker" aria-hidden>
          <div className="sale-ticker-track">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i}>
                {SALE.title} · {SALE.tagline} · {SALE.dates} · {SALE.slogan} ·
              </span>
            ))}
          </div>
        </div>

        <StoreHeader />

        <section className="hero sale-hero">
          <div className="hero-stage">
            <Image
              src="/images/logo-deos.png"
              alt="Deo's Hub"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 52vw"
              className="hero-photo"
            />
            <div className="hero-grain" aria-hidden />
            <div className="float-orb orb-a" aria-hidden />
            <div className="float-orb orb-b" aria-hidden />
          </div>

          <div className="hero-copy">
            <p className="eyebrow flash-text">Only sales of the year</p>
            <h1>
              The Scent
              <span>Affair</span>
            </h1>
            <p className="hero-line">
              {SALE.dates}. Add bottles to cart, then checkout on WhatsApp{" "}
              {SALE.whatsappDisplay}.
            </p>
            <div className="sale-date-pill pulse-glow">{SALE.dates}</div>
            <div className="hero-actions">
              <a href="#collection" className="btn-solid flash-btn">
                Shop the sale
              </a>
              <a
                href={generalWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="ghost-link"
              >
                WhatsApp {SALE.whatsappDisplay}
                <span aria-hidden>→</span>
              </a>
            </div>
            <p className="hero-delivery">{SALE.delivery}</p>
          </div>
        </section>

        <section id="offers" className="offers-strip">
          <div className="offers-inner">
            <div className="offers-badge flash-soft">Special Offers</div>
            <div className="offers-grid">
              {SALE.offers.map((offer) => (
                <article key={offer} className="offer-card">
                  <h3>{offer}</h3>
                  <p>Grab them before {SALE.dates.split("–")[1]?.trim()}.</p>
                </article>
              ))}
            </div>
            <p className="offers-slogan">{SALE.slogan}</p>
          </div>
        </section>

        <section id="collection" className="archive">
          <header className="archive-head wide">
            <p className="eyebrow dark flash-text">Sale collection</p>
            <h2>Smell like luxury, pay less</h2>
          </header>
          <Suspense fallback={<ProductsFallback />}>
            <StorefrontProducts />
          </Suspense>
        </section>

        <section id="how" className="how">
          <header className="archive-head wide">
            <p className="eyebrow dark">How to order</p>
            <h2>Fast WhatsApp checkout</h2>
          </header>
          <div className="how-grid">
            <article>
              <span>01</span>
              <h3>Browse the sale</h3>
              <p>Pick discounted perfumes from The Scent Affair collection.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Add to cart</h3>
              <p>Select as many bottles as you want before checkout.</p>
            </article>
            <article>
              <span>03</span>
              <h3>WhatsApp us</h3>
              <p>
                Send your cart to {SALE.whatsappDisplay}. Delivery starts Dec
                3rd.
              </p>
            </article>
          </div>
          <a
            href={generalWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-solid how-wa"
          >
            Message {SALE.whatsappDisplay}
          </a>
        </section>

        <section className="cta-band">
          <Image
            src="/images/logo-deos.png"
            alt=""
            fill
            sizes="100vw"
            className="cta-bg"
          />
          <div className="cta-veil" aria-hidden />
          <div className="cta-inner">
            <p className="eyebrow flash-text">{SALE.title}</p>
            <h2>{SALE.slogan}</h2>
            <p>
              Sale runs {SALE.dates}. Message {SALE.whatsappDisplay} on
              WhatsApp to confirm your order.
            </p>
            <div className="hero-actions">
              <a href="#collection" className="btn-solid light flash-btn">
                Back to sale items
              </a>
              <a
                href={generalWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="ghost-link"
              >
                Chat now
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </section>

        <footer className="site-footer rich">
          <div className="footer-grid">
            <div>
              <div className="footer-brand">
                <Image
                  src="/images/logo-deos.png"
                  alt="Deo's Hub"
                  width={56}
                  height={56}
                  className="logo-mark"
                />
                <p className="logo">
                  Deo&apos;s <i>Hub</i>
                </p>
              </div>
              <p>
                {SALE.title}. {SALE.tagline} {SALE.dates}.
              </p>
            </div>
            <div>
              <p className="footer-label">Explore</p>
              <a href="#offers">Special offers</a>
              <a href="#collection">Shop sale</a>
              <a href="#how">How to order</a>
            </div>
            <div>
              <p className="footer-label">WhatsApp</p>
              <a
                href={generalWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
              >
                {SALE.whatsappDisplay}
              </a>
              <p>{SALE.delivery}</p>
            </div>
          </div>
          <p className="footer-base">© 2026 Deo&apos;s Hub · {SALE.title}</p>
        </footer>
      </div>
    </StoreShell>
  );
}
