import { editingModes, supportedFormats } from "@/lib/product";

export async function readJson<T>(request: Request): Promise<T> {
  try {
    return (await request.json()) as T;
  } catch {
    return {} as T;
  }
}

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function normalizeMode(mode?: string) {
  const fallback = "Auto AI";
  if (!mode) return fallback;
  return editingModes.some((item) => item.name === mode) ? mode : fallback;
}

export function assertSupportedVideo(filename: string) {
  const extension = filename.split(".").pop()?.toUpperCase();
  return Boolean(extension && supportedFormats.includes(extension));
}
