"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { UploadCloud } from "lucide-react";
import { editingModes, supportedFormats } from "@/lib/product";
import type { Project } from "@/lib/types";

type Step = "idle" | "uploaded" | "analyzed" | "queued" | "completed";

type WorkflowState = {
  step: Step;
  project?: Project;
  renderId?: string;
  statusUrl?: string;
  message?: string;
};

export function UploadWorkflow({ defaultUserId = "user_demo_001" }: { defaultUserId?: string }) {
  const [state, setState] = useState<WorkflowState>({ step: "idle" });
  const [loading, setLoading] = useState(false);

  async function upload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    formData.set("userId", localStorage.getItem("editor_handal_token") || defaultUserId);

    const response = await fetch("/api/upload", { method: "POST", body: formData });
    const result = await response.json();
    setLoading(false);
    if (!response.ok) {
      setState({ step: "idle", message: result.error || "Upload gagal." });
      return;
    }
    setState({ step: "uploaded", project: result.data.project, message: "Upload berhasil. Project dibuat di backend." });
  }

  async function analyze() {
    if (!state.project) return;
    setLoading(true);
    const response = await fetch("/api/ai/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projectId: state.project.id, editingMode: state.project.editingMode }),
    });
    const result = await response.json();
    setLoading(false);
    if (!response.ok) {
      setState((current) => ({ ...current, message: result.error || "Analisis gagal." }));
      return;
    }
    setState({ step: "analyzed", project: result.data.project, message: "Analisis AI selesai dan tersimpan." });
  }

  async function generate() {
    if (!state.project) return;
    setLoading(true);
    const response = await fetch("/api/ai/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projectId: state.project.id }),
    });
    const result = await response.json();
    setLoading(false);
    if (!response.ok) {
      setState((current) => ({ ...current, message: result.error || "Generate gagal." }));
      return;
    }
    setState({ step: "queued", project: result.data.project, renderId: result.data.renderId, statusUrl: result.data.statusUrl, message: "Render masuk queue BullMQ-style." });
  }

  async function checkStatus() {
    if (!state.statusUrl) return;
    setLoading(true);
    const response = await fetch(state.statusUrl);
    const result = await response.json();
    setLoading(false);
    if (!response.ok) {
      setState((current) => ({ ...current, message: result.error || "Status gagal dicek." }));
      return;
    }
    setState((current) => ({
      ...current,
      step: result.data.project.status === "Completed" ? "completed" : "queued",
      project: result.data.project,
      message: `Status render: ${result.data.render.status}`,
    }));
  }

  return (
    <div className="space-y-6">
      <form onSubmit={upload} className="space-y-6">
        <label className="grid min-h-80 cursor-pointer place-items-center rounded-3xl border-2 border-dashed border-blue-200 bg-blue-50/60 p-8 text-center hover:bg-blue-50">
          <div>
            <UploadCloud className="mx-auto size-14 text-primary" />
            <h2 className="mt-4 text-2xl font-black">Drag & drop video mentah</h2>
            <p className="mt-2 text-slate-600">Format {supportedFormats.join(", ")}. File dikirim ke backend upload.</p>
            <input name="file" className="mt-6 block w-full text-sm" type="file" accept=".mp4,.mov,.avi,.mkv,video/*" required />
          </div>
        </label>
        <div>
          <label className="text-sm font-bold">Editing Mode</label>
          <select name="editingMode" className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3">
            {editingModes.map((mode) => <option key={mode.name}>{mode.name}</option>)}
          </select>
        </div>
        <button disabled={loading} className="w-full rounded-2xl bg-secondary px-5 py-4 font-bold text-white disabled:opacity-60">{loading ? "Memproses..." : "1. Upload ke Backend"}</button>
      </form>

      {state.message && <p className="rounded-2xl bg-blue-50 p-4 text-sm font-semibold text-primary">{state.message}</p>}

      {state.project && (
        <div className="rounded-3xl border border-slate-200 p-5">
          <h3 className="text-xl font-black">{state.project.title}</h3>
          <p className="mt-2 text-sm text-slate-600">Status: {state.project.status} • Mode: {state.project.editingMode}</p>
          {state.project.analysis && (
            <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-slate-600">
              <li>Content type: {state.project.contentType}</li>
              <li>Recommended style: {state.project.recommendedEditingStyle}</li>
              <li>Viral score: {state.project.viralScore}</li>
            </ul>
          )}
          <div className="mt-5 flex flex-wrap gap-3">
            <button disabled={loading || state.step === "analyzed" || state.step === "queued" || state.step === "completed"} onClick={analyze} className="rounded-full bg-primary px-4 py-2 text-sm font-bold text-white disabled:opacity-50">2. Analyze AI</button>
            <button disabled={loading || state.step !== "analyzed"} onClick={generate} className="rounded-full bg-secondary px-4 py-2 text-sm font-bold text-white disabled:opacity-50">3. Generate</button>
            <button disabled={loading || !state.statusUrl} onClick={checkStatus} className="rounded-full border border-slate-200 px-4 py-2 text-sm font-bold disabled:opacity-50">Cek Status</button>
            <Link href={`/projects/${state.project.id}`} className="rounded-full border border-slate-200 px-4 py-2 text-sm font-bold">Detail Project</Link>
          </div>
          {state.step === "completed" && state.project.resultUrl && <a className="mt-4 block font-bold text-primary" href={state.project.resultUrl}>Download hasil render</a>}
        </div>
      )}
    </div>
  );
}
