# 💎 In Money — Polyglot Monorepo

> **Enterprise-Grade Offline-First PWA Financial & Cashflow Overflow Engine**  
> **UI Aesthetic**: Dribbble Monochromatic Clay Tactile Design System (`#e6eae0` / `#121214` / `#e4e7e0`)  
> **Target Devices**: 100% Fit di iPhone, Android, iPad, MacBook, Laptop, & PC Widescreen  
> **Author**: Moch. Erik Irriansyah (NIM 04123003 — Universitas Narotama)

---

## 🏛️ Struktur Arsitektur Monorepo

Proyek ini dibangun dengan struktur monorepo ultra-kompleks multi-bahasa:

```
├── apps/
│   ├── web-pwa/              # Frontend React 19 + TypeScript + Tailwind v4 + Dexie.js (Offline PWA)
│   └── server-api/           # Backend REST API Node.js / Express.js + SQLite / Prisma
│
├── services/
│   ├── ledger-engine-go/     # Microservice Ledger Double-Entry Berkecepatan Tinggi (Go)
│   ├── analytics-engine-py/  # Mesin Prediksi Arus Kas & Scoring Finansial (Python FastAPI)
│   └── native-math-cpp/      # Algoritma Finansial & Compound Interest Native (C++20)
│
├── packages/
│   ├── core/                 # Shared Business Logic & Currency Formatter Rupiah (TypeScript)
│   ├── database/             # Skema IndexedDB Lokal & Repositori Data (Dexie.js)
│   ├── pdf-engine/           # Generator PDF Resmi Laporan Keuangan & Tabungan (jsPDF)
│   ├── sync-backup/          # Serializer Cadangan JSON & Validasi Integritas (Zod)
│   └── types/                # Definisi Tipe Global & Data Contracts (TypeScript)
│
├── scripts/
│   ├── build-all.sh          # Skrip build otomatis seluruh modul
│   ├── start-dev.sh          # Skrip menjalankan server development
│   ├── test-all.sh           # Skrip pengujian otomatis lintas bahasa
│   └── package-zip.sh        # Skrip packaging ke file .zip
│
└── deployments/
    └── docker-compose.yml    # Stack deployment container untuk Mac / Armbian CasaOS
```

---

## 🚀 Panduan Menjalankan Proyek

### 1. Menjalankan Live Prototype (Instan)
```bash
python3 -m http.server 4321 --directory preview/
# Buka http://localhost:4321 di browser
```

### 2. Menjalankan Frontend PWA (Vite + React)
```bash
cd apps/web-pwa
npm install
npm run dev
```

### 3. Membuat Arsip ZIP Lengkap
```bash
bash scripts/package-zip.sh
```
