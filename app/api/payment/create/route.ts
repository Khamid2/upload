import { randomUUID } from "node:crypto";
import { accepted, fail } from "@/lib/api";
import { pricingPlans } from "@/lib/product";
import { updateDb } from "@/lib/server/db";
import { readJson } from "@/lib/validators";

const planPrice: Record<string, number> = { Pro: 99000, Business: 299000 };

export async function POST(request: Request) {
  const body = await readJson<{ userId?: string; plan?: string }>(request);
  const userId = body.userId || "user_demo_001";
  const plan = body.plan || "Pro";
  const amount = planPrice[plan];
  if (!amount) return fail("Plan berbayar tidak valid.");

  const payment = await updateDb((db) => {
    const user = db.users.find((item) => item.id === userId);
    if (!user) return null;
    const nextPayment = {
      id: `pay_${randomUUID()}`,
      userId,
      amount,
      provider: "midtrans",
      status: "pending",
      transactionId: `trx_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    db.payments.push(nextPayment);
    return nextPayment;
  });

  if (!payment) return fail("User tidak ditemukan.", 404);
  return accepted({ provider: "midtrans", payment, paymentUrl: `https://app.sandbox.midtrans.com/snap/${payment.transactionId}`, availablePlans: pricingPlans });
}
