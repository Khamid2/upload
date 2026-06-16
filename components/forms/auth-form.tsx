"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type AuthMode = "login" | "register" | "forgot";

type Props = {
  mode: AuthMode;
};

export function AuthForm({ mode }: Props) {
  const router = useRouter();
  const [message, setMessage] = useState<string>();
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(undefined);

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    const endpoint = mode === "register" ? "/api/auth/register" : mode === "forgot" ? "/api/auth/forgot-password" : "/api/auth/login";

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await response.json();
    setLoading(false);

    if (!response.ok) {
      setMessage(result.error || "Request gagal diproses.");
      return;
    }

    if (result.data?.token) localStorage.setItem("editor_handal_token", result.data.token);
    setMessage(result.data?.message || "Berhasil terhubung ke backend.");

    if (mode !== "forgot") router.push(result.data?.redirectTo || "/dashboard");
  }

  async function googleLogin() {
    setLoading(true);
    const response = await fetch("/api/auth/google", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Google Creator", email: "google.creator@editorhandal.id" }),
    });
    const result = await response.json();
    setLoading(false);
    if (!response.ok) {
      setMessage(result.error || "Google login gagal.");
      return;
    }
    localStorage.setItem("editor_handal_token", result.data.token);
    router.push(result.data.redirectTo || "/dashboard");
  }

  return (
    <>
      {mode !== "forgot" && (
        <button disabled={loading} onClick={googleLogin} className="mt-6 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 font-bold hover:bg-slate-50 disabled:opacity-60" type="button">
          {mode === "register" ? "Register" : "Login"} with Google
        </button>
      )}
      {mode !== "forgot" && <div className="my-6 h-px bg-slate-200" />}
      <form className="space-y-4" onSubmit={submit}>
        {mode === "register" && <input name="name" className="w-full rounded-2xl border border-slate-200 px-4 py-3" placeholder="Nama" required />}
        <input name="email" className="w-full rounded-2xl border border-slate-200 px-4 py-3" placeholder="Email" type="email" required />
        {mode !== "forgot" && <input name="password" className="w-full rounded-2xl border border-slate-200 px-4 py-3" placeholder="Password" type="password" minLength={8} required />}
        <button disabled={loading} className="w-full rounded-2xl bg-primary px-4 py-3 font-bold text-white disabled:opacity-60">
          {loading ? "Memproses..." : mode === "register" ? "Create Account" : mode === "forgot" ? "Kirim Reset Link" : "Login"}
        </button>
      </form>
      {message && <p className="mt-4 rounded-2xl bg-blue-50 px-4 py-3 text-sm font-semibold text-primary">{message}</p>}
    </>
  );
}
