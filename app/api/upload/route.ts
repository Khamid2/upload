import { accepted, fail } from "@/lib/api";
import { createProject, updateDb } from "@/lib/server/db";
import { supportedFormats, uploadLimits } from "@/lib/product";
import { assertSupportedVideo, normalizeMode } from "@/lib/validators";

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");
  const editingMode = normalizeMode(String(formData.get("editingMode") || "Auto AI"));
  const userId = String(formData.get("userId") || "user_demo_001");

  if (!(file instanceof File)) return fail("File video wajib diupload.");
  if (!assertSupportedVideo(file.name)) return fail(`Format tidak didukung. Gunakan ${supportedFormats.join(", ")}.`);

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
  const project = createProject({
    userId,
    title: safeName.replace(/\.[^.]+$/, ""),
    videoUrl: `r2://editor-handal/raw/${Date.now()}-${safeName}`,
    editingMode,
    duration: Math.max(15, Math.round(file.size / 1_000_000) * 3),
  });

  await updateDb((db) => {
    db.projects.push(project);
  });

  return accepted({
    project,
    file: { name: file.name, size: file.size, type: file.type },
    uploadUrl: project.videoUrl,
    supportedFormats,
    uploadLimits,
    nextStep: "/api/ai/analyze",
  });
}
