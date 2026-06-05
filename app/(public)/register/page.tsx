import Link from "next/link";
import { Card } from "@/components/card";
import { AuthForm } from "@/components/forms/auth-form";

export default function RegisterPage() {
  return (
    <main className="mx-auto grid min-h-[calc(100vh-73px)] max-w-md place-items-center px-6 py-12">
      <Card className="w-full">
        <h1 className="text-3xl font-black">Register</h1>
        <p className="mt-2 text-slate-600">Buat akun dan dapatkan 3 video gratis per bulan.</p>
        <AuthForm mode="register" />
        <p className="mt-4 text-sm text-slate-600">Sudah punya akun? <Link href="/login" className="font-bold text-primary">Login</Link></p>
      </Card>
    </main>
  );
}
