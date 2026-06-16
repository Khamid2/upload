import { BarChart3, Clock, CreditCard, FileVideo, Sparkles, UploadCloud, Wand2, Zap } from "lucide-react";

export const editingModes = [
  {
    name: "Affiliate Viral",
    audience: "TikTok & Shopee Affiliate",
    description: "Fast cut, zoom, subtitle besar, CTA otomatis, dan sound effect untuk konten jualan.",
  },
  {
    name: "TikTok Viral",
    audience: "Short-form creator",
    description: "Dynamic subtitle, fast pacing, auto zoom, dan efek viral siap FYP.",
  },
  {
    name: "Storytelling",
    audience: "Creator narasi",
    description: "Slow zoom, transisi sinematik, dan subtitle emosional untuk membangun cerita.",
  },
  {
    name: "Podcast",
    audience: "Podcaster & interview",
    description: "Speaker focus, subtitle clean, dan noise reduction untuk klip percakapan.",
  },
  {
    name: "Product Review",
    audience: "Reviewer & seller",
    description: "Highlight mention produk, CTA insertion, dan zoom fokus produk.",
  },
  {
    name: "Auto AI",
    audience: "Semua creator",
    description: "AI memilih style terbaik berdasarkan jenis konten, hook, dan pacing video.",
  },
];

export const pricingPlans = [
  {
    name: "Free",
    price: "Rp0",
    description: "Mulai validasi konten pendek tanpa biaya.",
    features: ["3 video per bulan", "Watermark", "Maksimal 720p", "Upload hingga 200 MB"],
    cta: "Mulai Gratis",
  },
  {
    name: "Pro",
    price: "Rp99.000/bulan",
    description: "Paket utama untuk creator dan affiliate aktif.",
    features: ["100 render", "Tanpa watermark", "Resolusi 1080p", "Priority Queue", "Upload hingga 2 GB"],
    cta: "Upgrade Pro",
    featured: true,
  },
  {
    name: "Business",
    price: "Rp299.000/bulan",
    description: "Untuk tim marketing, agency, dan UMKM skala tinggi.",
    features: ["Unlimited Render", "Team Access", "Priority Rendering", "Upload hingga 5 GB"],
    cta: "Hubungi Sales",
  },
];

export const pipeline = [
  "Speech Recognition dengan Whisper API",
  "Content Classification: podcast, affiliate, tutorial, storytelling, review",
  "Scene Detection untuk perubahan frame, topik, dan momen penting",
  "Silence Removal untuk jeda panjang dan kesalahan bicara",
  "Hook Detection untuk bagian mengejutkan dan berpotensi viral",
  "Auto Subtitle Bahasa Indonesia dan Inggris",
  "Effects Generation: zoom, transition, dan sound effect",
  "Rendering video final siap download",
];

export const dashboardStats = [
  { label: "Total Video Generated", value: "128", icon: FileVideo },
  { label: "Credits Tersisa", value: "72", icon: CreditCard },
  { label: "Paket Langganan", value: "Pro", icon: Sparkles },
  { label: "Total Waktu Dihemat", value: "314 jam", icon: Clock },
  { label: "Render Bulan Ini", value: "24", icon: BarChart3 },
];

export const recentProjects = [
  { id: "affiliate-serum", title: "Review Serum Affiliate", status: "Completed", date: "4 Juni 2026", mode: "Affiliate Viral", score: 91 },
  { id: "podcast-umkm", title: "Podcast UMKM Growth", status: "Rendering", date: "3 Juni 2026", mode: "Podcast", score: 78 },
  { id: "storytelling-brand", title: "Cerita Brand Lokal", status: "Analyzed", date: "2 Juni 2026", mode: "Storytelling", score: 84 },
];

export const supportedFormats = ["MP4", "MOV", "AVI", "MKV"];

export const uploadLimits = [
  { plan: "Free", limit: "200 MB" },
  { plan: "Pro", limit: "2 GB" },
  { plan: "Business", limit: "5 GB" },
];

export const featureCards = [
  { title: "Upload Mentah", text: "Creator cukup unggah video mentah dari kamera atau smartphone.", icon: UploadCloud },
  { title: "AI Editor", text: "Analisis hook, momen penting, speaker, bahasa, dan pacing secara otomatis.", icon: Wand2 },
  { title: "Siap Publish", text: "Download hasil final dengan subtitle, efek, CTA, dan viral score.", icon: Zap },
];
