# ISEKAI SKILL FRONTEND

Isekai Skill Frontend adalah antarmuka web utama untuk sistem Aether. Proyek ini menyediakan dasbor bertema RPG bagi pengguna untuk melacak kemajuan belajar mereka, mengunggah bukti (seperti repositori GitHub atau jurnal belajar), dan menguji pengetahuan teoretis mereka melalui AI Quiz Arena yang adaptif.

---

## 📦 Fitur
- **Progresi Skill RPG:** Visualisasikan jalur belajar Anda sebagai pohon keahlian (skill tree) atau konstelasi.
- **Pelacakan Bukti:** Hubungkan proyek GitHub Anda dan dokumentasikan jurnal belajar harian.
- **AI Quiz Arena:** Ikuti kuis yang dibuat secara dinamis berdasarkan keahlian aktif dan tingkat XP Anda.
- **Widget Umpan Balik Dinamis:** Kirimkan laporan bug atau umpan balik umum dengan mudah.
- **Autentikasi Aman:** Manajemen sesi yang aman memanfaatkan cookie HttpOnly dan token in-memory.

---

## 🛠 Teknologi
- Next.js (React)
- Tailwind CSS v4
- Zustand
- Axios
- Framer Motion

---

## 🏗 Arsitektur
Klien (Next.js) → API (NestJS) → Database (PostgreSQL)

---

## ⚙️ Instalasi

**1. Kloning Repositori**

```bash
git clone https://github.com/faizulmushofa/isekai-skill-front-end.git
```

**2. Masuk ke Proyek**

```bash
cd isekai-skill-frontend
```

**3. Instal Dependensi**

```bash
npm install
```

---

## 🔑 Variabel Lingkungan (ENV)

Buat file `.env.local` dan isikan:

```env
PORT=3000
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## 🚀 Perintah Aplikasi

**Pengembangan (Development):**

```bash
npm run dev
```

**Build Produksi:**

```bash
npm run build
```

**Mulai Server Produksi:**

```bash
npm run start
```

**Linting:**

```bash
npm run lint
```

---

## 🌐 API

**URL Dasar:**
`http://localhost:5000/api`

**Endpoint Utama:**
- Auth (Autentikasi)
- Users (Pengguna)
- Projects (Proyek)
- Skills (Keahlian)
- Quests (Misi)

---

## 📁 Struktur Proyek

```text
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
```

---

## 🗺 Peta Jalan (Roadmap)
- [ ] Menghubungkan ke Endpoint Backend Asli
- [ ] Mengimplementasikan Logika AI Quiz Arena
- [ ] Menambahkan Visualisasi Konstelasi Keahlian
- [ ] Memperluas Widget Dasbor
