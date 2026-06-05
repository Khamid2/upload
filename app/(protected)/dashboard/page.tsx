import Link from "next/link";
import { BarChart3, Clock, CreditCard, FileVideo, Sparkles } from "lucide-react";
import { Card } from "@/components/card";
import { readDb } from "@/lib/server/db";
import { demoUserId, getSessionUserId } from "@/lib/server/session";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const db = await readDb();
  const userId = await getSessionUserId();
  const user = db.users.find((item) => item.id === userId) || db.users.find((item) => item.id === demoUserId) || db.users[0];
  const projects = db.projects.filter((project) => project.userId === user.id).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const completed = projects.filter((project) => project.status === "Completed").length;
  const renderThisMonth = db.renders.length;
  const savedHours = Math.max(1, completed * 3);
  const stats = [
    { label: "Total Video Generated", value: String(completed), icon: FileVideo },
    { label: "Credits Tersisa", value: String(user.credits), icon: CreditCard },
    { label: "Paket Langganan", value: user.plan, icon: Sparkles },
    { label: "Total Waktu Dihemat", value: `${savedHours} jam`, icon: Clock },
    { label: "Render Bulan Ini", value: String(renderThisMonth), icon: BarChart3 },
  ];

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-primary">Dashboard</p>
          <h1 className="mt-2 text-4xl font-black">Selamat datang, {user.name}!</h1>
        </div>
        <Link href="/upload" className="rounded-full bg-primary px-5 py-3 text-sm font-bold text-white">Upload Video</Link>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <stat.icon className="size-8 text-primary" />
            <p className="mt-5 text-3xl font-black">{stat.value}</p>
            <p className="mt-1 text-sm text-slate-600">{stat.label}</p>
          </Card>
        ))}
      </div>
      <Card className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black">Recent Projects dari Backend</h2>
          <Link href="/projects" className="text-sm font-bold text-primary">Lihat Semua</Link>
        </div>
        <div className="mt-6 divide-y divide-slate-100">
          {projects.slice(0, 5).map((project) => (
            <Link key={project.id} href={`/projects/${project.id}`} className="grid gap-4 py-4 md:grid-cols-[80px_1fr_120px_140px] md:items-center">
              <div className="aspect-video rounded-xl bg-gradient-to-br from-primary to-accent" />
              <div>
                <p className="font-black">{project.title}</p>
                <p className="text-sm text-slate-600">{project.editingMode} • Viral Score {project.viralScore ?? "-"}</p>
              </div>
              <span className="rounded-full bg-blue-50 px-3 py-1 text-center text-xs font-bold text-primary">{project.status}</span>
              <span className="text-sm text-slate-500">{new Date(project.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</span>
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
}
