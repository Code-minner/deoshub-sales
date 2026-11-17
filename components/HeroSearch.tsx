"use client";

import Image from "next/image";
import {
  FormEvent,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { normalizeCategory } from "@/lib/categories";
import { formatNaira } from "@/lib/whatsapp";
import type { Product } from "@/lib/schema";
import { useCatalog } from "./CatalogProvider";
import { useSearch } from "./SearchProvider";

function matchesQuery(product: Product, needle: string) {
  if (!needle) return false;
  const haystack = [
    product.name,
    product.subname,
    product.description,
    product.category,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return haystack.includes(needle);
}

export function HeroSearch() {
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const { query, setQuery, submitSearch } = useSearch();
  const { products, openProduct } = useCatalog();
  const [value, setValue] = useState(query);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setValue(query);
  }, [query]);

  useEffect(() => {
    function onPointerDown(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  const results = useMemo(() => {
    const needle = value.trim().toLowerCase();
    if (!needle) return [];
    return products.filter((product) => matchesQuery(product, needle)).slice(0, 6);
  }, [products, value]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    submitSearch(value);
    setOpen(false);
  }

  function pickProduct(product: Product) {
    setValue(product.name);
    setQuery(product.name);
    setOpen(false);
    openProduct(product);
  }

  return (
    <div className="site-search" ref={rootRef}>
      <form className="hero-search" onSubmit={onSubmit} role="search">
        <input
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search perfumes, brands, scents..."
          aria-label="Search products"
          aria-autocomplete="list"
          aria-controls={listId}
          aria-expanded={open && (value.trim().length > 0 || results.length > 0)}
          autoComplete="off"
        />
        <button type="submit">Search</button>
      </form>

      {open && value.trim() ? (
        <div className="search-dropdown" id={listId} role="listbox">
          {results.length === 0 ? (
            <p className="search-dropdown-empty">
              No products match &ldquo;{value.trim()}&rdquo;
            </p>
          ) : (
            results.map((product) => (
              <button
                key={product.id}
                type="button"
                className="search-dropdown-item"
                role="option"
                onClick={() => pickProduct(product)}
              >
                <span className="search-dropdown-thumb">
                  <Image
                    src={product.imageUrl}
                    alt=""
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </span>
                <span className="search-dropdown-copy">
                  <strong>{product.name}</strong>
                  <em>
                    {product.subname
                      ? `${product.subname} · `
                      : ""}
                    {normalizeCategory(product.category)}
                  </em>
                </span>
                <span className="search-dropdown-price">
                  {formatNaira(product.price)}
                </span>
              </button>
            ))
          )}
        </div>
      ) : null}
    </div>
  );
}
