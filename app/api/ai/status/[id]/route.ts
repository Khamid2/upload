import { fail, ok } from "@/lib/api";
import { updateDb } from "@/lib/server/db";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const result = await updateDb((db) => {
    const render = db.renders.find((item) => item.id === id);
    if (!render) return null;
    const project = db.projects.find((item) => item.id === render.projectId);
    if (!project) return null;

    const elapsed = Date.now() - new Date(render.startedAt).getTime();
    if (render.status === "Queued" && elapsed > 1000) render.status = "Rendering";
    if (elapsed > 2500) {
      render.status = "Completed";
      render.finishedAt = render.finishedAt || new Date().toISOString();
      render.processingTime = Math.max(3, Math.round(elapsed / 1000));
      project.status = "Completed";
      project.resultUrl = `https://cdn.editorhandal.id/result/${project.id}.mp4`;
      project.updatedAt = new Date().toISOString();
    } else {
      project.status = render.status;
      project.updatedAt = new Date().toISOString();
    }
    return { render, project };
  });

  if (!result) return fail("Render tidak ditemukan.", 404);
  return ok(result);
}
