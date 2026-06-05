import { Card } from "@/components/card";
import { editingModes, pipeline, supportedFormats, uploadLimits } from "@/lib/product";

export default function FeaturesPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <p className="text-sm font-bold uppercase tracking-[0.25em] text-primary">Features</p>
      <h1 className="mt-3 max-w-4xl text-5xl font-black text-secondary">AI analysis, auto editing, subtitle, effects, dan rekomendasi viral dalam satu workspace.</h1>
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        <Card>
          <h2 className="text-2xl font-black">AI Analysis Engine</h2>
          <p className="mt-3 text-slate-600">Menganalisa durasi, bahasa, kecepatan bicara, jumlah speaker, jenis konten, hook potensial, dan momen penting.</p>
        </Card>
        <Card>
          <h2 className="text-2xl font-black">Viral Score</h2>
          <p className="mt-3 text-slate-600">Skor 0-100 berdasarkan hook strength, engagement potential, subtitle quality, dan video pacing.</p>
        </Card>
        <Card>
          <h2 className="text-2xl font-black">AI Recommendation</h2>
          <p className="mt-3 text-slate-600">Saran otomatis untuk hook yang kurang kuat, video terlalu panjang, atau CTA yang belum jelas.</p>
        </Card>
      </div>
      <h2 className="mt-16 text-3xl font-black">Editing Modes</h2>
      <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {editingModes.map((mode) => (
          <Card key={mode.name}>
            <h3 className="text-xl font-black">{mode.name}</h3>
            <p className="mt-2 text-sm font-bold text-primary">{mode.audience}</p>
            <p className="mt-3 text-slate-600">{mode.description}</p>
          </Card>
        ))}
      </div>
      <div className="mt-16 grid gap-8 lg:grid-cols-2">
        <Card>
          <h2 className="text-2xl font-black">Supported Upload</h2>
          <p className="mt-3 text-slate-600">Format: {supportedFormats.join(", ")}.</p>
          <div className="mt-6 space-y-3">
            {uploadLimits.map((item) => (
              <div key={item.plan} className="flex justify-between rounded-2xl bg-slate-50 p-4 font-semibold"><span>{item.plan}</span><span>{item.limit}</span></div>
            ))}
          </div>
        </Card>
        <Card>
          <h2 className="text-2xl font-black">AI Processing Pipeline</h2>
          <ol className="mt-5 list-decimal space-y-2 pl-5 text-slate-700">
            {pipeline.map((step) => <li key={step}>{step}</li>)}
          </ol>
        </Card>
      </div>
    </main>
  );
}
