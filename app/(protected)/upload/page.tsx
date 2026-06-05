import { Card } from "@/components/card";
import { UploadWorkflow } from "@/components/workspace/upload-workflow";
import { uploadLimits } from "@/lib/product";
import { getSessionUserId } from "@/lib/server/session";

export const dynamic = "force-dynamic";

export default async function UploadPage() {
  const userId = await getSessionUserId();
  return (
    <div>
      <p className="text-sm font-bold uppercase tracking-[0.25em] text-primary">Upload Video</p>
      <h1 className="mt-2 text-4xl font-black">Generate video siap publish.</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.8fr]">
        <Card>
          <UploadWorkflow defaultUserId={userId} />
        </Card>
        <Card>
          <h2 className="text-2xl font-black">Limit Upload</h2>
          <div className="mt-5 space-y-3">
            {uploadLimits.map((item) => (
              <div key={item.plan} className="flex justify-between rounded-2xl bg-slate-50 p-4"><span className="font-bold">{item.plan}</span><span>{item.limit}</span></div>
            ))}
          </div>
          <h3 className="mt-8 font-black">Analisis AI</h3>
          <p className="mt-2 text-slate-600">Durasi, bahasa, kecepatan bicara, jumlah speaker, jenis konten, hook potensial, dan momen penting dibuat melalui API <code>/api/ai/analyze</code>.</p>
          <h3 className="mt-8 font-black">Backend terhubung</h3>
          <p className="mt-2 text-slate-600">Upload membuat project, Analyze memperbarui hasil analisis, Generate membuat render queue, dan status render bisa dicek dari frontend.</p>
        </Card>
      </div>
    </div>
  );
}
