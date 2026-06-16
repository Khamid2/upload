import { fail, ok } from "@/lib/api";
import { updateDb } from "@/lib/server/db";
import { readJson } from "@/lib/validators";

export async function POST(request: Request) {
  const body = await readJson<{ transactionId?: string; status?: string }>(request);
  if (!body.transactionId) return fail("transactionId wajib diisi.");

  const payment = await updateDb((db) => {
    const found = db.payments.find((item) => item.transactionId === body.transactionId);
    if (!found) return null;
    found.status = body.status || "paid";
    const user = db.users.find((item) => item.id === found.userId);
    if (user && found.status === "paid") {
      user.plan = found.amount >= 299000 ? "Business" : "Pro";
      user.credits = user.plan === "Business" ? 9999 : 100;
      user.updatedAt = new Date().toISOString();
    }
    return found;
  });

  if (!payment) return fail("Payment tidak ditemukan.", 404);
  return ok({ message: "Midtrans webhook diproses.", payment });
}
