import Link from "next/link";
import { notFound } from "next/navigation";
import { Card } from "@/components/card";
import { readDb } from "@/lib/server/db";

export const dynamic = "force-dynamic";

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = await readDb();
  const project = db.projects.find((item) => item.id === id);
  if (!project) notFound();
  const renders = db.renders.filter((item) => item.projectId === project.id);

  return (
    <div>
      <Link href="/projects" className="text-sm font-bold text-primary">← Kembali ke Projects</Link>
      <div className="mt-5 grid gap-8 lg:grid-cols-[1fr_0.7fr]">
        <Card>
          <div className="aspect-video rounded-3xl bg-gradient-to-br from-primary via-accent to-secondary" />
          <h1 className="mt-6 text-4xl font-black">{project.title}</h1>
          <p className="mt-2 text-slate-600">Status {project.status} • Mode {project.editingMode}</p>
          {project.resultUrl ? (
            <a href={project.resultUrl} className="mt-6 inline-flex rounded-full bg-primary px-5 py-3 text-sm font-bold text-white">Download Result</a>
          ) : (
            <Link href="/upload" className="mt-6 inline-flex rounded-full bg-secondary px-5 py-3 text-sm font-bold text-white">Lanjut Generate</Link>
          )}
        </Card>
        <Card>
          <h2 className="text-2xl font-black">AI Analysis</h2>
          <div className="mt-5 space-y-3 text-sm text-slate-600">
            <p><strong>Content Type:</strong> {project.contentType ?? "Belum dianalisis"}</p>
            <p><strong>Recommended Style:</strong> {project.recommendedEditingStyle ?? project.editingMode}</p>
            <p><strong>Language:</strong> {project.language ?? "-"}</p>
            <p><strong>Duration:</strong> {project.duration ? `${project.duration} detik` : "-"}</p>
            <p><strong>Viral Score:</strong> {project.viralScore ?? "-"}/100</p>
          </div>
          {project.analysis && (
            <div className="mt-6 space-y-4">
              <div>
                <h3 className="font-black">Momen penting</h3>
                <ul className="mt-2 list-disc pl-5 text-sm text-slate-600">{project.analysis.importantMoments.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
              <div>
                <h3 className="font-black">Rekomendasi AI</h3>
                <ul className="mt-2 list-disc pl-5 text-sm text-slate-600">{project.analysis.recommendations.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
            </div>
          )}
          <h3 className="mt-6 font-black">Render History</h3>
          <div className="mt-3 space-y-2">
            {renders.length === 0 && <p className="text-sm text-slate-500">Belum ada render.</p>}
            {renders.map((render) => <p key={render.id} className="rounded-2xl bg-slate-50 p-3 text-sm font-semibold">{render.id}: {render.status}</p>)}
          </div>
        </Card>
      </div>
    </div>
  );
}
