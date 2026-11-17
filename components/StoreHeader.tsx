"use client";

import Image from "next/image";
import { SALE } from "@/lib/sale";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { CartButton } from "./CartButton";
import { HeroSearch } from "./HeroSearch";
import { IconWhatsApp } from "./Icons";

export function StoreHeader() {
  const generalWhatsApp = buildWhatsAppUrl();

  return (
    <div className="site-chrome">
      <div className="sale-ticker" aria-hidden>
        <div className="sale-ticker-track">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i}>
              {SALE.title} · {SALE.tagline} · {SALE.dates} · {SALE.slogan} ·
            </span>
          ))}
        </div>
      </div>

      <header className="site-header">
        <div className="site-header-inner">
          <a href="/" className="logo logo-img">
            <Image
              src="/images/logo-deos.png"
              alt="Deo's Hub"
              width={52}
              height={52}
              className="logo-mark flash-soft"
              priority
            />
            <span className="logo-text">
              Deo&apos;s <i>Hub</i>
            </span>
          </a>

          <div className="site-header-search">
            <HeroSearch />
          </div>

          <div className="site-header-actions">
            <nav className="nav-links" aria-label="Store">
              <a href="#offers">Offers</a>
              <a href="#collection">Shop sale</a>
              <a href="#how">How to order</a>
            </nav>
            <a
              href={generalWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className="wa-nav"
              aria-label={`WhatsApp ${SALE.whatsappDisplay}`}
            >
              <IconWhatsApp size={18} />
              <span className="wa-nav-label">{SALE.whatsappDisplay}</span>
            </a>
            <CartButton />
          </div>
        </div>
      </header>
    </div>
  );
}
