import Link from "next/link";
import { CreditCard, LayoutDashboard, ListVideo, Settings, UploadCloud } from "lucide-react";
import { LogoutButton } from "@/components/workspace/logout-button";

const items = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/projects", label: "Projects", icon: ListVideo },
  { href: "/upload", label: "Upload", icon: UploadCloud },
  { href: "/billing", label: "Billing", icon: CreditCard },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-slate-200 bg-secondary p-6 text-white lg:block">
        <Link href="/" className="text-2xl font-black">Editor Handal</Link>
        <p className="mt-2 text-sm text-slate-300">AI video editor untuk creator Indonesia.</p>
        <nav className="mt-10 space-y-2">
          {items.map((item) => (
            <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10 hover:text-white">
              <item.icon className="size-5" />
              {item.label}
            </Link>
          ))}
        </nav>
        <LogoutButton />
      </aside>
      <main className="lg:pl-72">
        <div className="mx-auto max-w-6xl px-6 py-8">{children}</div>
      </main>
    </div>
  );
}
