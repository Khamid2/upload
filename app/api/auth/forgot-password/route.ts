import { fail, ok } from "@/lib/api";
import { readDb } from "@/lib/server/db";
import { isValidEmail, readJson } from "@/lib/validators";

export async function POST(request: Request) {
  const body = await readJson<{ email?: string }>(request);
  const email = body.email?.trim().toLowerCase();
  if (!email || !isValidEmail(email)) return fail("Email valid wajib diisi.");

  const db = await readDb();
  const exists = db.users.some((item) => item.email === email);
  return ok({ message: "Jika email terdaftar, link reset password akan dikirim.", emailQueued: exists });
}
