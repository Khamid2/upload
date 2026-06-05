import { fail, ok } from "@/lib/api";
import { hashPassword, publicUser, readDb } from "@/lib/server/db";
import { attachSession } from "@/lib/server/session";
import { isValidEmail, readJson } from "@/lib/validators";

export async function POST(request: Request) {
  const body = await readJson<{ email?: string; password?: string }>(request);
  const email = body.email?.trim().toLowerCase();
  const password = body.password ?? "";

  if (!email || !password) return fail("Email dan password wajib diisi.");
  if (!isValidEmail(email)) return fail("Format email tidak valid.");

  const db = await readDb();
  const user = db.users.find((item) => item.email === email && item.passwordHash === hashPassword(password));
  if (!user) return fail("Email atau password salah.", 401);

  const response = ok({ user: publicUser(user), token: user.id, redirectTo: "/dashboard" });
  return attachSession(response, user.id);
}
