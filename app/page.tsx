import Image from "next/image";
import { Suspense } from "react";
import { StorefrontProducts } from "@/components/StorefrontProducts";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

function ProductsFallback() {
  return (
    <div className="archive-skeleton" aria-hidden>
      <div className="skel" />
      <div className="skel" />
      <div className="skel tall" />
      <div className="skel" />
    </div>
  );
}

export default function Home() {
  const generalWhatsApp = buildWhatsAppUrl();

  return (
    <div className="maison">
      <header className="nav">
        <a href="/" className="logo">
          Deo&apos;s <i>Hub</i>
        </a>
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
      </header>

      <section className="hero">
        <div className="hero-stage">
          <Image
            src="/images/hero-editorial.jpg"
            alt="Deo's Hub signature perfume"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 52vw"
            className="hero-photo"
          />
          <div className="hero-grain" aria-hidden />
        </div>

        <div className="hero-copy">
          <p className="eyebrow">Perfume boutique</p>
          <h1>
            Deo&apos;s
            <span>Hub</span>
          </h1>
          <p className="hero-line">
            Discover your signature scent. Choose a perfume and order straight
            on WhatsApp.
          </p>
          <div className="hero-actions">
            <a href="#collection" className="btn-solid">
              Browse collection
            </a>
            <a
              href={generalWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className="ghost-link"
            >
              Chat on WhatsApp
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </section>

      <section id="about" className="story">
        <div className="story-copy">
          <p className="eyebrow dark">About Deo&apos;s Hub</p>
          <h2>Scents with presence</h2>
          <p>
            We curate perfumes for evenings, offices, and first impressions.
            Pick what feels like you, then message us to confirm price and
            availability.
          </p>
          <ul className="story-points">
            <li>Curated perfume selection</li>
            <li>Clear pricing on every bottle</li>
            <li>Fast WhatsApp ordering</li>
          </ul>
          <a href="#collection" className="text-link">
            Shop scents →
          </a>
        </div>
        <div className="story-visual">
          <Image
            src="/images/perfume-feature.jpg"
            alt="Featured perfume bottle"
            fill
            sizes="(max-width: 768px) 100vw, 42vw"
            className="object-cover"
          />
        </div>
      </section>

      <section className="presence">
        <Image
          src="/images/silk-atmosphere.jpg"
          alt=""
          fill
          sizes="100vw"
          className="presence-bg"
        />
        <div className="presence-veil" aria-hidden />
        <blockquote>
          <p>
            Discover your signature scent
            <em> at Deo&apos;s Hub.</em>
          </p>
        </blockquote>
      </section>

      <section id="collection" className="archive">
        <header className="archive-head wide">
          <p className="eyebrow dark">Collection</p>
          <h2>Scents ready for you</h2>
          <p className="lede">
            Tap a bottle to open WhatsApp with your order ready to send.
          </p>
        </header>
        <Suspense fallback={<ProductsFallback />}>
          <StorefrontProducts />
        </Suspense>
      </section>

      <section className="split-gallery">
        <div className="split-copy">
          <p className="eyebrow dark">Why shop here</p>
          <h2>Beautiful bottles. Simple buying.</h2>
          <p>
            No long checkout forms. See the perfume, love it, and order on
            WhatsApp in one tap. We reply with confirmation and delivery
            details.
          </p>
        </div>
        <div className="split-images">
          <div className="split-frame large">
            <Image
              src="/images/lifestyle-notes.jpg"
              alt="Perfume lifestyle flat lay"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="split-frame small">
            <Image
              src="/images/detail-cap.jpg"
              alt="Perfume bottle detail"
              fill
              sizes="(max-width: 768px) 50vw, 24vw"
              className="object-cover"
            />
          </div>
          <div className="split-frame small">
            <Image
              src="/images/collection-mood.jpg"
              alt="Perfume collection mood"
              fill
              sizes="(max-width: 768px) 50vw, 24vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section id="how" className="how">
        <header className="archive-head wide">
          <p className="eyebrow dark">How to order</p>
          <h2>Three easy steps</h2>
        </header>
        <div className="how-grid">
          <article>
            <span>01</span>
            <h3>Browse</h3>
            <p>Explore the collection and pick the perfume you want.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Tap Order</h3>
            <p>
              Hit Order on WhatsApp. Your product name and price are filled in
              for you.
            </p>
          </article>
          <article>
            <span>03</span>
            <h3>Confirm</h3>
            <p>We confirm availability, payment, and delivery with you.</p>
          </article>
        </div>
      </section>

      <section className="cta-band">
        <Image
          src="/images/hero-perfume.jpg"
          alt=""
          fill
          sizes="100vw"
          className="cta-bg"
        />
        <div className="cta-veil" aria-hidden />
        <div className="cta-inner">
          <p className="eyebrow">Ready to smell amazing?</p>
          <h2>Order your scent on WhatsApp</h2>
          <p>
            Questions about notes, size, or delivery? Message Deo&apos;s Hub
            now.
          </p>
          <div className="hero-actions">
            <a
              href={generalWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-solid light"
            >
              Order on WhatsApp
            </a>
            <a href="#collection" className="ghost-link">
              Back to collection
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </section>

      <footer className="site-footer rich">
        <div className="footer-grid">
          <div>
            <p className="logo">
              Deo&apos;s <i>Hub</i>
            </p>
            <p>
              Signature scents. Simple WhatsApp ordering. Discover your next
              bottle today.
            </p>
          </div>
          <div>
            <p className="footer-label">Explore</p>
            <a href="#about">About</a>
            <a href="#collection">Shop scents</a>
            <a href="#how">How to order</a>
          </div>
          <div>
            <p className="footer-label">Contact</p>
            <a
              href={generalWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
            >
              Chat on WhatsApp
            </a>
            <p>We reply fast during business hours.</p>
          </div>
        </div>
        <p className="footer-base">© 2026 Deo&apos;s Hub</p>
      </footer>
    </div>
  );
}
