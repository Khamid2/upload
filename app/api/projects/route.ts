import { fail, ok } from "@/lib/api";
import { createProject, readDb, updateDb } from "@/lib/server/db";
import { normalizeMode, readJson } from "@/lib/validators";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const db = await readDb();
  const projects = db.projects
    .filter((project) => !userId || project.userId === userId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return ok({ projects, total: projects.length });
}

export async function POST(request: Request) {
  const body = await readJson<{ userId?: string; title?: string; videoUrl?: string; editingMode?: string; duration?: number }>(request);
  if (!body.title?.trim()) return fail("Judul project wajib diisi.");
  if (!body.videoUrl?.trim()) return fail("videoUrl wajib diisi.");

  const project = createProject({
    userId: body.userId,
    title: body.title.trim(),
    videoUrl: body.videoUrl.trim(),
    editingMode: normalizeMode(body.editingMode),
    duration: body.duration,
  });

  await updateDb((db) => {
    db.projects.push(project);
  });

  return ok({ project, nextStep: "/api/ai/analyze" }, { status: 201 });
}
