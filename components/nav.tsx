import Link from "next/link";
import { Scissors } from "lucide-react";
import { ButtonLink } from "@/components/button";

export function PublicNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-black text-secondary">
          <span className="grid size-9 place-items-center rounded-2xl bg-primary text-white">
            <Scissors className="size-5" />
          </span>
          Editor Handal
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          <Link href="/features" className="hover:text-primary">Features</Link>
          <Link href="/pricing" className="hover:text-primary">Pricing</Link>
          <Link href="/dashboard" className="hover:text-primary">Dashboard</Link>
        </nav>
        <div className="flex items-center gap-3">
          <ButtonLink href="/login" variant="ghost" className="hidden px-4 py-2 sm:inline-flex">Login</ButtonLink>
          <ButtonLink href="/register" className="px-4 py-2">Coba Gratis</ButtonLink>
        </div>
      </div>
    </header>
  );
}
