import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Editor Handal | AI Video Editing SaaS",
  description: "Editor Handal membantu creator Indonesia membuat video pendek siap publish dari video mentah dalam hitungan menit.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
