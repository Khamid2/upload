import { fail, ok } from "@/lib/api";
import { readDb, updateDb } from "@/lib/server/db";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = await readDb();
  const project = db.projects.find((item) => item.id === id);
  if (!project) return fail("Project tidak ditemukan.", 404);
  const renders = db.renders.filter((item) => item.projectId === id);
  return ok({ project, renders });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const deleted = await updateDb((db) => {
    const before = db.projects.length;
    db.projects = db.projects.filter((item) => item.id !== id);
    db.renders = db.renders.filter((item) => item.projectId !== id);
    return before !== db.projects.length;
  });

  if (!deleted) return fail("Project tidak ditemukan.", 404);
  return ok({ id, deleted: true });
}
