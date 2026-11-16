import Image from "next/image";
import { Suspense } from "react";
import { StorefrontProducts } from "@/components/StorefrontProducts";
import { StoreHeader } from "@/components/StoreHeader";
import { StoreShell } from "@/components/StoreShell";
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
      <div className="maison">
        <StoreHeader />

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
              Discover your signature scent. Add bottles to your cart, then
              checkout on WhatsApp.
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
              Pick what feels like you, add to cart, then message us to confirm.
            </p>
            <ul className="story-points">
              <li>Curated perfume selection</li>
              <li>Clear sale and real pricing</li>
              <li>Multi-item cart + WhatsApp checkout</li>
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
              Add multiple bottles to your cart, then checkout on WhatsApp in
              one message.
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
              No long checkout forms. See the perfume, add it to cart, and send
              your full order on WhatsApp. We reply with confirmation and
              delivery details.
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
              <p>Explore the collection and pick the perfumes you want.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Add to cart</h3>
              <p>
                Tap Add to cart on each bottle. Build your full order before
                messaging us.
              </p>
            </article>
            <article>
              <span>03</span>
              <h3>Checkout</h3>
              <p>
                Open cart and tap Checkout on WhatsApp. We confirm payment and
                delivery.
              </p>
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
            <h2>Fill your cart, then WhatsApp us</h2>
            <p>
              Questions about notes, size, or delivery? Message Deo&apos;s Hub
              now.
            </p>
            <div className="hero-actions">
              <a href="#collection" className="btn-solid light">
                Shop collection
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

        <footer className="site-footer rich">
          <div className="footer-grid">
            <div>
              <p className="logo">
                Deo&apos;s <i>Hub</i>
              </p>
              <p>
                Signature scents. Cart shopping. Simple WhatsApp checkout.
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
    </StoreShell>
  );
}
