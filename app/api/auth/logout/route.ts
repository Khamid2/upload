import { ok } from "@/lib/api";
import { clearSession } from "@/lib/server/session";

export async function POST() {
  const response = ok({ message: "Logout berhasil. Hapus token sisi client dan kembali ke halaman login.", redirectTo: "/login" });
  return clearSession(response);
}
