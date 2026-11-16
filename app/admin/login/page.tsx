import Image from "next/image";
import { connection } from "next/server";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/LoginForm";
import { isAuthenticated } from "@/lib/auth";

type Props = {
  searchParams: Promise<{ next?: string }>;
};

export default async function AdminLoginPage({ searchParams }: Props) {
  await connection();

  if (await isAuthenticated()) {
    redirect("/admin");
  }

  const params = await searchParams;
  const nextPath =
    params.next && params.next.startsWith("/admin")
      ? params.next
      : "/admin";

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
      <LoginForm nextPath={nextPath} />
    </main>
  );
}
