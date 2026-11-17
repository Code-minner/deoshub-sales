"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const SLIDES = [
  {
    src: "/images/hero/perfume-1.jpg",
    alt: "Luxury perfume bottle",
    label: "Oud & Amber",
  },
  {
    src: "/images/hero/perfume-2.jpg",
    alt: "Perfume collection",
    label: "Fresh & Floral",
  },
  {
    src: "/images/hero/perfume-3.jpg",
    alt: "Designer fragrance",
    label: "Dark & Woody",
  },
  {
    src: "/images/hero/perfume-4.jpg",
    alt: "Gift set perfumes",
    label: "Gift Sets",
  },
];

const INTERVAL = 5000;

export function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (i: number) => setIndex((i + SLIDES.length) % SLIDES.length),
    [],
  );

  useEffect(() => {
    if (paused) return;
    const t = setInterval(
      () => setIndex((i) => (i + 1) % SLIDES.length),
      INTERVAL,
    );
    return () => clearInterval(t);
  }, [paused]);

  return (
    <div
      className="hero-slider"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {SLIDES.map((s, i) => (
        <div
          key={s.src}
          className={`hero-slide ${i === index ? "active" : ""}`}
        >
          <Image
            src={s.src}
            alt={s.alt}
            fill
            priority={i === 0}
            sizes="(max-width: 900px) 100vw, 52vw"
            className="hero-slide-img"
          />
        </div>
      ))}

      <div className="hero-veil" aria-hidden />
      <div className="hero-grain" aria-hidden />
      <div className="float-orb orb-a" aria-hidden />
      <div className="float-orb orb-b" aria-hidden />

      <div className="hero-slider-ui">
        <span className="hero-slide-label" key={index}>
          {SLIDES[index].label}
        </span>

        <div className="hero-dots" role="tablist" aria-label="Hero slides">
          {SLIDES.map((s, i) => (
            <button
              key={s.src}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Show slide ${i + 1}`}
              className={`hero-dot ${i === index ? "active" : ""}`}
              onClick={() => go(i)}
            />
          ))}
        </div>

        <div className="hero-arrows">
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => go(index - 1)}
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => go(index + 1)}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
