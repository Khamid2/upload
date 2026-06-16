import { fail, ok } from "@/lib/api";
import { createUser, publicUser, updateDb } from "@/lib/server/db";
import { attachSession } from "@/lib/server/session";
import { isValidEmail, readJson } from "@/lib/validators";

export async function POST(request: Request) {
  const body = await readJson<{ name?: string; email?: string; password?: string }>(request);
  const name = body.name?.trim();
  const email = body.email?.trim().toLowerCase();
  const password = body.password ?? "";

  if (!name || !email || !password) return fail("Nama, email, dan password wajib diisi.");
  if (!isValidEmail(email)) return fail("Format email tidak valid.");
  if (password.length < 8) return fail("Password minimal 8 karakter.");

  const user = await updateDb((db) => {
    if (db.users.some((item) => item.email === email)) return null;
    const nextUser = createUser({ name, email, password });
    db.users.push(nextUser);
    return nextUser;
  });

  if (!user) return fail("Email sudah terdaftar.", 409);

  const response = ok({ user: publicUser(user), token: user.id, message: "Registrasi berhasil. Email verification siap dikirim." }, { status: 201 });
  return attachSession(response, user.id);
}
