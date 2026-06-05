import { accepted, fail } from "@/lib/api";
import { editingModes } from "@/lib/product";
import { updateDb } from "@/lib/server/db";
import { normalizeMode, readJson } from "@/lib/validators";

function classify(mode: string) {
  if (mode.includes("Affiliate")) return "Affiliate";
  if (mode.includes("Podcast")) return "Podcast";
  if (mode.includes("Storytelling")) return "Storytelling";
  if (mode.includes("Product")) return "Review";
  if (mode.includes("TikTok")) return "Short Video";
  return "Auto AI";
}

export async function POST(request: Request) {
  const body = await readJson<{ projectId?: string; editingMode?: string }>(request);
  if (!body.projectId) return fail("projectId wajib diisi.");

  const project = await updateDb((db) => {
    const found = db.projects.find((item) => item.id === body.projectId);
    if (!found) return null;
    const selectedMode = normalizeMode(body.editingMode || found.editingMode);
    const contentType = classify(selectedMode);
    found.status = "Analyzed";
    found.editingMode = selectedMode;
    found.contentType = contentType;
    found.recommendedEditingStyle = selectedMode === "Auto AI" ? "TikTok Viral" : selectedMode;
    found.language = "id";
    found.viralScore = selectedMode === "Affiliate Viral" ? 91 : selectedMode === "Podcast" ? 78 : 84;
    found.analysis = {
      speakingPace: selectedMode === "Storytelling" ? "Sedang" : "Cepat",
      speakerCount: selectedMode === "Podcast" ? 2 : 1,
      hookPotential: found.viralScore > 85 ? "High" : "Medium",
      importantMoments: ["Opening hook", "Momen utama", "CTA akhir"],
      recommendations: ["Tambahkan subtitle dinamis", "Potong jeda panjang", "Pastikan CTA muncul di 3 detik terakhir"],
    };
    found.updatedAt = new Date().toISOString();
    return found;
  });

  if (!project) return fail("Project tidak ditemukan.", 404);

  return accepted({
    project,
    availableModes: editingModes.map((item) => item.name),
    nextStep: "/api/ai/generate",
  });
}
