import { accepted, fail } from "@/lib/api";
import { createRender, updateDb } from "@/lib/server/db";
import { readJson } from "@/lib/validators";

export async function POST(request: Request) {
  const body = await readJson<{ projectId?: string }>(request);
  if (!body.projectId) return fail("projectId wajib diisi.");

  const result = await updateDb((db) => {
    const project = db.projects.find((item) => item.id === body.projectId);
    if (!project) return null;
    const render = createRender(project.id);
    project.status = "Queued";
    project.updatedAt = new Date().toISOString();
    db.renders.push(render);
    return { project, render };
  });

  if (!result) return fail("Project tidak ditemukan.", 404);
  return accepted({ renderId: result.render.id, status: result.render.status, queue: "priority", statusUrl: `/api/ai/status/${result.render.id}`, project: result.project });
}
