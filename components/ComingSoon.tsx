"use client";

import Image from "next/image";
import { SALE } from "@/lib/sale";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { IconWhatsApp } from "./Icons";
import { SaleCountdown } from "./SaleCountdown";

export function ComingSoon() {
  const whatsapp = buildWhatsAppUrl();

  return (
    <main className="coming-soon">
      <div className="coming-soon-media" aria-hidden>
        <Image
          src="/images/collection-mood.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="coming-soon-photo"
        />
        <div className="coming-soon-veil" />
      </div>

      <div className="coming-soon-content">
        <div className="coming-soon-brand">
          <Image
            src="/images/logo-deos.png"
            alt="Deo's Hub"
            width={72}
            height={72}
            className="coming-soon-logo flash-soft"
            priority
          />
          <p className="coming-soon-brand-name">
            Deo&apos;s <i>Hub</i>
          </p>
        </div>

        <p className="coming-soon-eyebrow">Only sale of the year</p>
        <h1 className="coming-soon-title">
          The Scent
          <span>Affair</span>
        </h1>
        <p className="coming-soon-lead">
          Luxury fragrances are waiting behind the curtain. Soft prices, rich
          scents, and our biggest drop of the year open on {SALE.dates.split("–")[0]?.trim()}.
        </p>

        <div className="coming-soon-timer-block">
          <p className="coming-soon-timer-label">Doors open in</p>
          <SaleCountdown />
        </div>

        <p className="coming-soon-note">
          Save the date. Browse opens {SALE.dates}. Delivery begins Dec 3rd.
        </p>

        <a
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="wa-nav coming-soon-wa"
        >
          <IconWhatsApp size={18} />
          <span>Chat us on WhatsApp</span>
        </a>
      </div>
    </main>
  );
}
