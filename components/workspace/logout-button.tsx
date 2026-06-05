"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    localStorage.removeItem("editor_handal_token");
    router.push("/login");
  }

  return (
    <button onClick={logout} className="mt-8 flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10 hover:text-white">
      <LogOut className="size-5" /> Logout
    </button>
  );
}
