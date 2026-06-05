import { ArrowRight, CheckCircle2, PlayCircle } from "lucide-react";
import { ButtonLink } from "@/components/button";
import { Card } from "@/components/card";
import { editingModes, featureCards, pipeline, pricingPlans } from "@/lib/product";

export default function LandingPage() {
  return (
    <main>
      <section className="hero-grid overflow-hidden bg-background">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
          <div>
            <p className="mb-5 inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-primary ring-1 ring-blue-100">AI Video Editor khusus pasar Indonesia</p>
            <h1 className="text-5xl font-black tracking-tight text-secondary md:text-7xl">Upload video mentah. AI edit jadi konten viral.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">Editor Handal membantu TikTok Creator, affiliate marketer, UMKM, dan digital marketer menghasilkan video pendek yang menarik dan siap dipublikasikan dalam hitungan menit.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/upload">Generate Video <ArrowRight className="ml-2 size-4" /></ButtonLink>
              <ButtonLink href="/features" variant="ghost"><PlayCircle className="mr-2 size-4" /> Lihat Fitur</ButtonLink>
            </div>
            <div className="mt-10 grid max-w-xl grid-cols-3 gap-4 text-sm font-semibold text-slate-600">
              <span>90% waktu hemat</span>
              <span>Subtitle otomatis</span>
              <span>Viral score</span>
            </div>
          </div>
          <Card className="relative overflow-hidden bg-secondary p-3 text-white shadow-soft">
            <div className="rounded-[1.25rem] bg-slate-900 p-4">
              <div className="aspect-video rounded-2xl bg-gradient-to-br from-blue-600 via-sky-400 to-cyan-300 p-5">
                <div className="flex h-full flex-col justify-end rounded-xl bg-black/25 p-5 backdrop-blur-sm">
                  <p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-100">Affiliate Viral</p>
                  <h2 className="mt-2 text-3xl font-black">“3 alasan produk ini laris!”</h2>
                  <div className="mt-4 h-2 w-2/3 rounded-full bg-white" />
                  <div className="mt-2 h-2 w-1/2 rounded-full bg-white/70" />
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3 text-center text-sm">
                <div className="rounded-2xl bg-white/10 p-4"><b>91</b><br />Viral Score</div>
                <div className="rounded-2xl bg-white/10 p-4"><b>28s</b><br />Final Cut</div>
                <div className="rounded-2xl bg-white/10 p-4"><b>1080p</b><br />Export</div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {featureCards.map((feature) => (
            <Card key={feature.title}>
              <feature.icon className="size-10 text-primary" />
              <h3 className="mt-5 text-xl font-black">{feature.title}</h3>
              <p className="mt-3 text-slate-600">{feature.text}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-primary">MVP editing modes</p>
            <h2 className="mt-3 text-4xl font-black text-secondary">Pilih style, klik generate, download hasil.</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {editingModes.map((mode) => (
              <Card key={mode.name}>
                <p className="text-sm font-bold text-primary">{mode.audience}</p>
                <h3 className="mt-2 text-2xl font-black">{mode.name}</h3>
                <p className="mt-3 text-slate-600">{mode.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-primary">AI pipeline</p>
            <h2 className="mt-3 text-4xl font-black">Dari transcript sampai rendering final.</h2>
            <p className="mt-4 text-slate-600">Pipeline MVP disiapkan untuk Whisper, GPT/Gemini, FFmpeg, Redis, BullMQ, Cloudflare R2, dan Midtrans.</p>
          </div>
          <div className="grid gap-3">
            {pipeline.map((step, index) => (
              <div key={step} className="flex items-start gap-4 rounded-2xl bg-white p-4 ring-1 ring-slate-200">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-blue-50 text-sm font-black text-primary">{index + 1}</span>
                <span className="font-medium text-slate-700">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary py-20 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center text-4xl font-black">Paket subscription bulanan</h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {pricingPlans.map((plan) => (
              <Card key={plan.name} className={plan.featured ? "border-accent bg-white" : "bg-slate-900 text-white"}>
                <h3 className="text-2xl font-black">{plan.name}</h3>
                <p className="mt-2 text-slate-500">{plan.description}</p>
                <p className="mt-6 text-3xl font-black">{plan.price}</p>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-2 text-sm"><CheckCircle2 className="size-5 text-accent" /> {feature}</li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
