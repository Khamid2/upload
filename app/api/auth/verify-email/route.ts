import { fail, ok } from "@/lib/api";
import { publicUser, updateDb } from "@/lib/server/db";
import { readJson } from "@/lib/validators";

export async function POST(request: Request) {
  const body = await readJson<{ userId?: string }>(request);
  if (!body.userId) return fail("userId wajib diisi.");

  const user = await updateDb((db) => {
    const found = db.users.find((item) => item.id === body.userId);
    if (!found) return null;
    found.emailVerified = true;
    found.updatedAt = new Date().toISOString();
    return found;
  });

  if (!user) return fail("User tidak ditemukan.", 404);
  return ok({ user: publicUser(user), message: "Email berhasil diverifikasi." });
}
