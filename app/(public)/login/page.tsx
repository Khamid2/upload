import Link from "next/link";
import { Card } from "@/components/card";
import { AuthForm } from "@/components/forms/auth-form";

export default function LoginPage() {
  return (
    <main className="mx-auto grid min-h-[calc(100vh-73px)] max-w-md place-items-center px-6 py-12">
      <Card className="w-full">
        <h1 className="text-3xl font-black">Login</h1>
        <p className="mt-2 text-slate-600">Masuk untuk membuka dashboard Editor Handal.</p>
        <AuthForm mode="login" />
        <div className="mt-4 flex justify-between text-sm text-slate-600"><Link href="/register">Register</Link><Link href="/forgot-password">Forgot Password?</Link></div>
      </Card>
    </main>
  );
}
