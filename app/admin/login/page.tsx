import { redirect } from "next/navigation";
import { isAdmin } from "../../lib/auth/session";
import LoginForm from "./LoginForm";

export default async function LoginPage() {
  if (await isAdmin()) {
    redirect("/admin");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-cream px-6">
      <div className="w-full max-w-sm">
        <p className="mb-2 font-mono text-sm text-slate">PHEAROM.DEV</p>
        <h1 className="mb-8 text-3xl font-bold tracking-tight">Admin sign in</h1>
        <LoginForm />
      </div>
    </main>
  );
}
