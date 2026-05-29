# ISEKAI SKILL FRONTEND

Isekai Skill Frontend adalah antarmuka web utama untuk sistem Aether. Proyek ini menyediakan dasbor bertema RPG bagi pengguna untuk melacak kemajuan belajar mereka, mengunggah bukti (seperti repositori GitHub atau jurnal belajar), dan menguji pengetahuan teoretis mereka melalui AI Quiz Arena yang adaptif.

━━━━━━━━━━━━━━━━━━━━━━━━━━

📦 FITUR
- Progresi Skill RPG: Visualisasikan jalur belajar Anda sebagai pohon keahlian (skill tree) atau konstelasi.
- Pelacakan Bukti: Hubungkan proyek GitHub Anda dan dokumentasikan jurnal belajar harian.
- AI Quiz Arena: Ikuti kuis yang dibuat secara dinamis berdasarkan keahlian aktif dan tingkat XP Anda.
- Widget Umpan Balik Dinamis: Kirimkan laporan bug atau umpan balik umum dengan mudah.
- Autentikasi Aman: Manajemen sesi yang aman memanfaatkan cookie HttpOnly dan token in-memory.

━━━━━━━━━━━━━━━━━━━━━━━━━━

🛠 TEKNOLOGI (TECH STACK)
- Next.js (React)
- Tailwind CSS v4
- Zustand
- Axios
- Framer Motion

━━━━━━━━━━━━━━━━━━━━━━━━━━

🏗 ARSITEKTUR
Klien (Next.js) → API (NestJS) → Database (PostgreSQL)

━━━━━━━━━━━━━━━━━━━━━━━━━━

⚙️ INSTALASI

1. Kloning Repositori
git clone <repo-url>

2. Masuk ke Proyek
cd isekai-skill-frontend

3. Instal Dependensi
npm install

━━━━━━━━━━━━━━━━━━━━━━━━━━

🔑 VARIABEL LINGKUNGAN (ENV)

.env.local

PORT=3000
NEXT_PUBLIC_API_URL=http://localhost:5000/api

━━━━━━━━━━━━━━━━━━━━━━━━━━

🚀 PERINTAH APLIKASI (RUN COMMANDS)

Pengembangan (Development):
npm run dev

Build Produksi:
npm run build

Mulai Server Produksi:
npm run start

Linting:
npm run lint

━━━━━━━━━━━━━━━━━━━━━━━━━━

🌐 API

URL Dasar:
http://localhost:5000/api

Endpoint Utama:
- Auth (Autentikasi)
- Users (Pengguna)
- Projects (Proyek)
- Skills (Keahlian)
- Quests (Misi)

━━━━━━━━━━━━━━━━━━━━━━━━━━

📁 STRUKTUR PROYEK

/
├── app/                  # Next.js App Router (Halaman & Layout)
├── components/           # Komponen UI yang dapat digunakan kembali
│   ├── dashboard/        # Komponen khusus dasbor
│   ├── project/          # Komponen penghubung proyek
│   ├── quiz/             # Komponen Quiz Arena
│   └── ui/               # Elemen UI inti
├── hooks/                # Custom React Hooks
├── lib/                  # Utilitas dan konfigurasi klien API
├── stores/               # Manajemen state Zustand
└── public/               # Aset statis

━━━━━━━━━━━━━━━━━━━━━━━━━━

🗺 PETA JALAN (ROADMAP)
- [ ] Menghubungkan ke Endpoint Backend Asli
- [ ] Mengimplementasikan Logika AI Quiz Arena
- [ ] Menambahkan Visualisasi Konstelasi Keahlian
- [ ] Memperluas Widget Dasbor

━━━━━━━━━━━━━━━━━━━━━━━━━━

📄 LISENSI
MIT
