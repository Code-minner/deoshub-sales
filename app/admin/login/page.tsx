import Image from "next/image";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/LoginForm";
import { isAuthenticated } from "@/lib/auth";

type Props = {
  searchParams: Promise<{ next?: string }>;
};

function LoginShell({ children }: { children?: React.ReactNode }) {
  return (
    <main className="login-page">
      <Image
        src="/images/collection-mood.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="login-bg"
      />
      <div className="login-veil" aria-hidden />
      {children}
    </main>
  );
}

async function AdminLoginContent({ searchParams }: Props) {
  if (await isAuthenticated()) {
    redirect("/admin");
  }

  const params = await searchParams;
  const nextPath =
    params.next && params.next.startsWith("/admin")
      ? params.next
      : "/admin";

  return <LoginForm nextPath={nextPath} />;
}

export default function AdminLoginPage({ searchParams }: Props) {
  return (
    <LoginShell>
      <Suspense
        fallback={
          <div className="login-card">
            <p className="text-sm tracking-[0.25em] uppercase text-[var(--gold)]">
              Deo&apos;s Hub
            </p>
            <h1 className="mt-2 font-display text-3xl text-white">
              Admin login
            </h1>
            <p className="mt-2 text-sm text-white/70">Loading...</p>
          </div>
        }
      >
        <AdminLoginContent searchParams={searchParams} />
      </Suspense>
    </LoginShell>
  );
}
