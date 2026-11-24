import { Suspense } from "react";
import { connection } from "next/server";
import { ComingSoon } from "@/components/ComingSoon";
import { StorefrontHome } from "@/components/StorefrontHome";
import { isSaleOpen } from "@/lib/sale";

type HomeProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function hasPreviewFlag(
  value: string | string[] | undefined,
): boolean {
  if (value === "1" || value === "true") return true;
  return Array.isArray(value) && (value.includes("1") || value.includes("true"));
}

async function HomeGate({ searchParams }: HomeProps) {
  await connection();

  const params = (await searchParams) ?? {};
  const preview =
    hasPreviewFlag(params.preview) || hasPreviewFlag(params.open);

  if (!isSaleOpen(new Date()) && !preview) {
    return <ComingSoon />;
  }

  return <StorefrontHome />;
}

export default function Home({ searchParams }: HomeProps) {
  return (
    <Suspense fallback={<ComingSoon />}>
      <HomeGate searchParams={searchParams} />
    </Suspense>
  );
}
