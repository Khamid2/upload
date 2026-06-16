import { CheckCircle2 } from "lucide-react";
import { ButtonLink } from "@/components/button";
import { Card } from "@/components/card";
import { pricingPlans } from "@/lib/product";

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <div className="text-center">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-primary">Pricing</p>
        <h1 className="mt-3 text-5xl font-black text-secondary">Paket sederhana untuk creator sampai tim bisnis.</h1>
      </div>
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {pricingPlans.map((plan) => (
          <Card key={plan.name} className={plan.featured ? "border-primary shadow-soft" : undefined}>
            <h2 className="text-2xl font-black">{plan.name}</h2>
            <p className="mt-2 min-h-12 text-slate-600">{plan.description}</p>
            <p className="mt-6 text-3xl font-black">{plan.price}</p>
            <ul className="mt-6 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex gap-2 text-sm text-slate-700"><CheckCircle2 className="size-5 text-primary" /> {feature}</li>
              ))}
            </ul>
            <ButtonLink href="/register" className="mt-8 w-full">{plan.cta}</ButtonLink>
          </Card>
        ))}
      </div>
    </main>
  );
}
