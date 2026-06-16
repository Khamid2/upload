import { Card } from "@/components/card";
import { BillingActions } from "@/components/workspace/billing-actions";
import { pricingPlans } from "@/lib/product";
import { readDb } from "@/lib/server/db";
import { demoUserId, getSessionUserId } from "@/lib/server/session";

export const dynamic = "force-dynamic";

export default async function BillingPage() {
  const db = await readDb();
  const userId = await getSessionUserId();
  const user = db.users.find((item) => item.id === userId) || db.users.find((item) => item.id === demoUserId);
  const payments = db.payments.filter((item) => item.userId === user?.id).sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  if (!user) return null;

  return (
    <div>
      <h1 className="text-4xl font-black">Billing</h1>
      <Card className="mt-8">
        <h2 className="text-2xl font-black">Current Plan: {user.plan}</h2>
        <p className="mt-2 text-slate-600">Credits aktif: {user.credits}. Billing terhubung ke endpoint payment create dan webhook Midtrans sandbox.</p>
      </Card>
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {pricingPlans.map((plan) => (
          <Card key={plan.name} className={plan.featured ? "border-primary shadow-soft" : undefined}>
            <h2 className="text-xl font-black">{plan.name}</h2>
            <p className="mt-2 text-2xl font-black">{plan.price}</p>
            <p className="mt-3 text-sm text-slate-600">{plan.features.join(" • ")}</p>
            {plan.name !== "Free" && <BillingActions userId={user.id} plan={plan.name} />}
          </Card>
        ))}
      </div>
      <Card className="mt-8">
        <h2 className="text-2xl font-black">Payment History</h2>
        <div className="mt-5 divide-y divide-slate-100">
          {payments.length === 0 && <p className="text-sm text-slate-500">Belum ada payment.</p>}
          {payments.map((payment) => (
            <div key={payment.id} className="flex flex-col justify-between gap-2 py-3 text-sm md:flex-row">
              <span className="font-bold">{payment.transactionId}</span>
              <span>Rp{payment.amount.toLocaleString("id-ID")}</span>
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-primary">{payment.status}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
