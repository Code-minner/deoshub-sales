export function parseScents(raw: unknown): string[] {
  if (Array.isArray(raw)) {
    return raw
      .map((item) => String(item).trim())
      .filter(Boolean)
      .filter((item, index, list) => list.indexOf(item) === index);
  }

  if (typeof raw !== "string" || !raw.trim()) return [];

  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parseScents(parsed);
    }
  } catch {
    // fall through to delimiter split
  }

  return raw
    .split(/[\n,|]/)
    .map((item) => item.trim())
    .filter(Boolean)
    .filter((item, index, list) => list.indexOf(item) === index);
}

export function serializeScents(scents: string[]): string {
  return JSON.stringify(parseScents(scents));
}

export function cartLineId(productId: string, scent?: string | null) {
  const clean = String(scent ?? "").trim();
  return clean ? `${productId}__${clean}` : productId;
}

export function cartLineName(baseName: string, scent?: string | null) {
  const clean = String(scent ?? "").trim();
  return clean ? `${baseName} · ${clean}` : baseName;
}
