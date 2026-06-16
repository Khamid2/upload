import { ok } from "@/lib/api";
import { createUser, publicUser, updateDb } from "@/lib/server/db";
import { attachSession } from "@/lib/server/session";
import { readJson } from "@/lib/validators";

export async function POST(request: Request) {
  const body = await readJson<{ email?: string; name?: string; avatar?: string; googleId?: string }>(request);
  const email = body.email?.trim().toLowerCase() || "google.creator@editorhandal.id";
  const user = await updateDb((db) => {
    const existing = db.users.find((item) => item.email === email);
    if (existing) return existing;
    const nextUser = createUser({
      name: body.name?.trim() || "Google Creator",
      email,
      googleId: body.googleId || `google_${Date.now()}`,
      avatar: body.avatar,
    });
    db.users.push(nextUser);
    return nextUser;
  });

  const response = ok({ provider: "google", user: publicUser(user), token: user.id, redirectTo: "/dashboard" });
  return attachSession(response, user.id);
}
