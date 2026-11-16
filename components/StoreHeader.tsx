"use client";

import Image from "next/image";
import { SALE } from "@/lib/sale";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { CartButton } from "./CartButton";
import { IconWhatsApp } from "./Icons";

export function StoreHeader() {
  const generalWhatsApp = buildWhatsAppUrl();

  return (
    <header className="nav sale-nav">
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
      <div className="nav-right">
        <nav className="nav-links">
          <a href="#offers">Offers</a>
          <a href="#collection">Shop sale</a>
          <a href="#how">How to order</a>
          <a
            href={generalWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-cta nav-cta-icon"
          >
            <IconWhatsApp size={14} />
            {SALE.whatsappDisplay}
          </a>
        </nav>
        <CartButton />
      </div>
    </header>
  );
}
