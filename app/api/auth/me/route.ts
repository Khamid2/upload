import { fail, ok } from "@/lib/api";
import { publicUser, readDb, updateDb } from "@/lib/server/db";
import { demoUserId, getSessionUserId } from "@/lib/server/session";
import { isValidEmail, readJson } from "@/lib/validators";

export async function GET(request: Request) {
  const userId = new URL(request.url).searchParams.get("userId") || await getSessionUserId();
  const db = await readDb();
  const user = db.users.find((item) => item.id === userId) || db.users.find((item) => item.id === demoUserId);
  if (!user) return fail("User tidak ditemukan.", 404);
  return ok(publicUser(user));
}

export async function PATCH(request: Request) {
  const body = await readJson<{ userId?: string; name?: string; email?: string }>(request);
  const userId = body.userId || await getSessionUserId();
  const name = body.name?.trim();
  const email = body.email?.trim().toLowerCase();

  if (!name) return fail("Nama wajib diisi.");
  if (!email || !isValidEmail(email)) return fail("Email valid wajib diisi.");

  const user = await updateDb((db) => {
    const duplicate = db.users.find((item) => item.email === email && item.id !== userId);
    if (duplicate) return "duplicate" as const;
    const found = db.users.find((item) => item.id === userId);
    if (!found) return null;
    found.name = name;
    found.email = email;
    found.updatedAt = new Date().toISOString();
    return found;
  });

  if (user === "duplicate") return fail("Email sudah digunakan user lain.", 409);
  if (!user) return fail("User tidak ditemukan.", 404);
  return ok({ user: publicUser(user), message: "Settings berhasil disimpan." });
}
