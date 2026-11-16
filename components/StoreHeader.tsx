"use client";

import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { CartButton } from "./CartButton";

export function StoreHeader() {
  const generalWhatsApp = buildWhatsAppUrl();

  return (
    <header className="nav">
      <a href="/" className="logo">
        Deo&apos;s <i>Hub</i>
      </a>
      <div className="nav-right">
        <nav className="nav-links">
          <a href="#about">About</a>
          <a href="#collection">Shop</a>
          <a href="#how">How to order</a>
          <a
            href={generalWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-cta"
          >
            WhatsApp
          </a>
        </nav>
        <CartButton />
      </div>
    </header>
  );
}
