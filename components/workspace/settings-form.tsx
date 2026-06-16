"use client";

import { FormEvent, useState } from "react";
import type { User } from "@/lib/types";

export function SettingsForm({ user }: { user: Omit<User, "passwordHash"> }) {
  const [message, setMessage] = useState<string>();
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(undefined);

    const payload = Object.fromEntries(new FormData(event.currentTarget).entries());
    const response = await fetch("/api/auth/me", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, userId: user.id }),
    });
    const result = await response.json();
    setLoading(false);
    setMessage(result.data?.message || result.error || "Request selesai.");
  }

  return (
    <form className="space-y-5" onSubmit={submit}>
      <div>
        <label className="text-sm font-bold">Nama</label>
        <input name="name" className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3" defaultValue={user.name} required />
      </div>
      <div>
        <label className="text-sm font-bold">Email</label>
        <input name="email" type="email" className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3" defaultValue={user.email} required />
      </div>
      <div>
        <label className="text-sm font-bold">Email Verification</label>
        <p className="mt-2 rounded-2xl bg-green-50 px-4 py-3 text-sm font-bold text-green-700">{user.emailVerified ? "Verified" : "Pending verification"}</p>
      </div>
      <div>
        <label className="text-sm font-bold">Plan</label>
        <p className="mt-2 rounded-2xl bg-blue-50 px-4 py-3 text-sm font-bold text-primary">{user.plan} • {user.credits} credits</p>
      </div>
      <button disabled={loading} className="rounded-full bg-primary px-5 py-3 text-sm font-bold text-white disabled:opacity-60">{loading ? "Menyimpan..." : "Simpan"}</button>
      {message && <p className="rounded-2xl bg-slate-50 p-4 text-sm font-semibold text-slate-700">{message}</p>}
    </form>
  );
}
