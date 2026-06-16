import { ok } from "@/lib/api";
import { readDb } from "@/lib/server/db";

export async function GET(request: Request) {
  const userId = new URL(request.url).searchParams.get("userId") || "user_demo_001";
  const db = await readDb();
  return ok(db.payments.filter((item) => item.userId === userId).sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
}
