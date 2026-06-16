# Editor Handal

Editor Handal adalah MVP AI Video Editing SaaS untuk pasar Indonesia. Aplikasi ini membantu content creator, affiliate marketer, UMKM, dan digital marketer mengubah video mentah menjadi video pendek siap publish.

## Fitur MVP

- Landing page, features, pricing, login, register, dan forgot password.
- Dashboard protected dengan summary, recent projects, project detail, upload, billing, dan settings.
- Frontend auth sudah terhubung ke backend API untuk register, login email, Google-login demo, forgot password, cookie session, dan logout.
- Frontend upload sudah terhubung ke backend pipeline: upload video sesuai session user, AI analyze, generate render, cek status render, lalu buka detail project.
- API backend CRUD project, auth/session, upload, AI analysis/generation/status, settings, payment Midtrans-style, dan webhook sudah menyimpan data runtime ke JSON store lokal `data/editor-handal.json`.
- Prisma schema PostgreSQL sesuai PRD: users, subscriptions, projects, renders, dan payments tetap tersedia untuk migrasi ke database production.
- UI modern SaaS dengan warna utama `#2563EB`, secondary `#0F172A`, accent `#38BDF8`, dan background `#F8FAFC`.

## Akun Demo

Gunakan kredensial berikut untuk mencoba login email lokal:

```txt
Email: demo@editorhandal.id
Password: demo12345
```

## Alur Frontend ↔ Backend

1. `/register` dan `/login` memanggil endpoint `/api/auth/*`, menerima token user, lalu menyimpan token di `localStorage`.
2. `/upload` mengirim `FormData` ke `/api/upload`; backend membuat project baru di JSON store.
3. Tombol **Analyze AI** memanggil `/api/ai/analyze` dan memperbarui project dengan content type, recommended style, momen penting, rekomendasi, dan viral score.
4. Tombol **Generate** memanggil `/api/ai/generate`; backend membuat render queue.
5. Tombol **Cek Status** memanggil `/api/ai/status/[id]`; setelah simulasi selesai, backend menandai project sebagai `Completed` dan membuat `resultUrl`.
6. `/dashboard`, `/projects`, dan `/projects/[id]` membaca data session user dari backend store sehingga hasil upload/generate langsung muncul di workspace.
7. `/billing` memanggil payment sandbox dan webhook demo untuk mengubah plan/credits, sedangkan `/settings` memanggil PATCH `/api/auth/me` untuk menyimpan profil.

## Tech Stack

- Next.js 15 + TypeScript
- TailwindCSS + komponen bergaya Shadcn UI
- Next.js API Routes
- JSON runtime store lokal untuk MVP terhubung tanpa database eksternal
- Prisma ORM + PostgreSQL schema untuk production migration
- NextAuth-ready endpoints
- Cloudflare R2-ready upload contract
- Redis/BullMQ-ready render queue contract
- FFmpeg/OpenAI Whisper/GPT/Gemini-ready AI processing contract
- Midtrans-ready payment contract

## Jalankan Lokal

```bash
npm install
npm run dev
```

Untuk deployment Procfile sekarang menjalankan web server Next.js:

```bash
npm run build
npm start
```

> Catatan: jika registry package mengembalikan `403 Forbidden`, install dependency tidak bisa diselesaikan di environment tersebut. Kode tetap disiapkan untuk berjalan setelah dependencies tersedia.

## Validasi

```bash
npm run typecheck
npm run lint
npm run build
```
