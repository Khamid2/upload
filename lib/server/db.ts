import { promises as fs } from "node:fs";
import path from "node:path";
import { createHash, randomUUID } from "node:crypto";
import type { Payment, Plan, Project, Render, User } from "@/lib/types";

type Database = {
  users: User[];
  projects: Project[];
  renders: Render[];
  payments: Payment[];
};

const dataFile = path.join(process.cwd(), "data", "editor-handal.json");

function now() {
  return new Date().toISOString();
}

function seed(): Database {
  const createdAt = now();
  const demoUser: User = {
    id: "user_demo_001",
    name: "Creator Demo",
    email: "demo@editorhandal.id",
    passwordHash: hashPassword("demo12345"),
    plan: "Pro",
    credits: 72,
    emailVerified: true,
    createdAt,
    updatedAt: createdAt,
  };

  const projects: Project[] = [
    {
      id: "affiliate-serum",
      userId: demoUser.id,
      title: "Review Serum Affiliate",
      status: "Completed",
      videoUrl: "r2://editor-handal/raw/affiliate-serum.mp4",
      resultUrl: "https://cdn.editorhandal.id/result/affiliate-serum.mp4",
      editingMode: "Affiliate Viral",
      viralScore: 91,
      duration: 42,
      language: "id",
      contentType: "Affiliate",
      recommendedEditingStyle: "Affiliate Viral",
      analysis: {
        speakingPace: "Cepat",
        speakerCount: 1,
        hookPotential: "High",
        importantMoments: ["Opening hook", "Benefit produk", "CTA beli sekarang"],
        recommendations: ["Hook sudah kuat", "CTA jelas", "Pertahankan durasi di bawah 45 detik"],
      },
      createdAt,
      updatedAt: createdAt,
    },
    {
      id: "podcast-umkm",
      userId: demoUser.id,
      title: "Podcast UMKM Growth",
      status: "Rendering",
      videoUrl: "r2://editor-handal/raw/podcast-umkm.mp4",
      editingMode: "Podcast",
      viralScore: 78,
      duration: 85,
      language: "id",
      contentType: "Podcast",
      recommendedEditingStyle: "Podcast",
      createdAt,
      updatedAt: createdAt,
    },
    {
      id: "storytelling-brand",
      userId: demoUser.id,
      title: "Cerita Brand Lokal",
      status: "Analyzed",
      videoUrl: "r2://editor-handal/raw/storytelling-brand.mp4",
      editingMode: "Storytelling",
      viralScore: 84,
      duration: 63,
      language: "id",
      contentType: "Storytelling",
      recommendedEditingStyle: "Storytelling",
      createdAt,
      updatedAt: createdAt,
    },
  ];

  return {
    users: [demoUser],
    projects,
    renders: [{ id: "render_demo_001", projectId: "podcast-umkm", startedAt: createdAt, status: "Rendering" }],
    payments: [{ id: "pay_demo_001", userId: demoUser.id, amount: 99000, provider: "midtrans", status: "paid", transactionId: "trx_demo_001", createdAt }],
  };
}

async function ensureDataFile() {
  await fs.mkdir(path.dirname(dataFile), { recursive: true });
  try {
    await fs.access(dataFile);
  } catch {
    await fs.writeFile(dataFile, JSON.stringify(seed(), null, 2));
  }
}

export async function readDb(): Promise<Database> {
  await ensureDataFile();
  const raw = await fs.readFile(dataFile, "utf8");
  return JSON.parse(raw) as Database;
}

export async function writeDb(data: Database) {
  await fs.mkdir(path.dirname(dataFile), { recursive: true });
  await fs.writeFile(dataFile, JSON.stringify(data, null, 2));
}

export async function updateDb<T>(updater: (data: Database) => T | Promise<T>) {
  const data = await readDb();
  const result = await updater(data);
  await writeDb(data);
  return result;
}

export function hashPassword(password: string) {
  return createHash("sha256").update(`editor-handal:${password}`).digest("hex");
}

export function publicUser(user: User) {
  const { passwordHash: _passwordHash, ...safeUser } = user;
  return safeUser;
}

export function createUser(input: { name: string; email: string; password?: string; googleId?: string; avatar?: string; plan?: Plan }): User {
  const createdAt = now();
  return {
    id: `user_${randomUUID()}`,
    name: input.name,
    email: input.email.toLowerCase(),
    passwordHash: input.password ? hashPassword(input.password) : undefined,
    googleId: input.googleId,
    avatar: input.avatar,
    plan: input.plan ?? "Free",
    credits: input.plan === "Business" ? 9999 : input.plan === "Pro" ? 100 : 3,
    emailVerified: Boolean(input.googleId),
    createdAt,
    updatedAt: createdAt,
  };
}

export function createProject(input: { userId?: string; title: string; videoUrl: string; editingMode: string; duration?: number }): Project {
  const createdAt = now();
  return {
    id: `project_${randomUUID()}`,
    userId: input.userId ?? "user_demo_001",
    title: input.title,
    status: "Uploaded",
    videoUrl: input.videoUrl,
    editingMode: input.editingMode,
    duration: input.duration,
    createdAt,
    updatedAt: createdAt,
  };
}

export function createRender(projectId: string): Render {
  return { id: `render_${randomUUID()}`, projectId, startedAt: now(), status: "Queued" };
}
