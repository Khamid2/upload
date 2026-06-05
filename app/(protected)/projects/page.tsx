import Link from "next/link";
import { Card } from "@/components/card";
import { readDb } from "@/lib/server/db";
import { getSessionUserId } from "@/lib/server/session";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const db = await readDb();
  const userId = await getSessionUserId();
  const projects = db.projects.filter((project) => project.userId === userId).sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-primary">Backend Projects</p>
          <h1 className="text-4xl font-black">Project List</h1>
        </div>
        <Link href="/upload" className="rounded-full bg-primary px-5 py-3 text-sm font-bold text-white">Upload Baru</Link>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Link key={project.id} href={`/projects/${project.id}`}>
            <Card className="h-full hover:shadow-soft">
              <div className="aspect-video rounded-2xl bg-gradient-to-br from-primary to-accent" />
              <h2 className="mt-5 text-xl font-black">{project.title}</h2>
              <p className="mt-2 text-sm text-slate-600">{project.editingMode} • {new Date(project.createdAt).toLocaleDateString("id-ID")}</p>
              <div className="mt-4 flex items-center justify-between gap-3">
                <p className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-sm font-bold text-primary">{project.status}</p>
                <p className="text-sm font-bold text-slate-500">Score {project.viralScore ?? "-"}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
