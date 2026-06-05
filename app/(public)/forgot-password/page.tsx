import Link from "next/link";
import { Card } from "@/components/card";
import { AuthForm } from "@/components/forms/auth-form";

export default function ForgotPasswordPage() {
  return (
    <main className="mx-auto grid min-h-[calc(100vh-73px)] max-w-md place-items-center px-6 py-12">
      <Card className="w-full">
        <h1 className="text-3xl font-black">Forgot Password</h1>
        <p className="mt-2 text-slate-600">Masukkan email akun untuk menerima link reset password.</p>
        <AuthForm mode="forgot" />
        <p className="mt-4 text-sm text-slate-600"><Link href="/login" className="font-bold text-primary">Kembali Login</Link></p>
      </Card>
    </main>
  );
}
