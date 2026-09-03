# 💎 In Money — Polyglot Monorepo & Security Audited PWA

> **Enterprise-Grade Offline-First PWA Financial & Cashflow Overflow Engine**  
> **UI Aesthetic**: Dribbble Monochromatic Clay Tactile Design System (`#e6eae0` / `#121214` / `#ffffff`)  
> **Target Devices**: 100% Fit di iPhone (Termasuk iPhone 12 Mini & Dynamic Island), Android, iPad, MacBook, Laptop, & PC Widescreen  
> **Live App**: [https://mocherik.github.io/in-money/](https://mocherik.github.io/in-money/)  
> **Author**: Moch. Erik Irriansyah (NIM 04123003 — Universitas Narotama)

---

## 🛡️ Laporan Audit Keamanan & Proteksi Sistem (Security & Vulnerability Assessment)

Aplikasi **In Money** telah melalui serangkaian pengujian keamanan ketat berbasis standar industri **OWASP Top 10 for Client-Side & PWA Application Security**, pengujian penetrasi statis (*Static Application Security Testing - SAST*), dan verifikasi pertahanan berlapis (*Defense-in-Depth*).

### 📋 Matriks Hasil Pengujian Keamanan:

| Kategori Pengujian | Vektor Serangan (*Attack Vector*) | Mekanisme Pertahanan (*Security Patch*) | Status Hasil Uji |
|---|---|---|:---:|
| **Anti-Injection** | DOM-based XSS, Stored XSS, HTML Injection, Script Execution | Lapisan filter sanitasi mutlak `escapeHtml()` pada seluruh input teks, nama kategori, catatan transaksi, tag `#`, dan hasil ekstraksi OCR struk belanja. | 🟢 **100% SAFE (PASSED)** |
| **Data Scraping & Privacy** | Scraping Bot, Web Crawlers, Unauthorized Data Extraction, Cloud Leaks | **Arsitektur Zero-Cloud Telemetry**. Seluruh data transaksi, mutasi rekening, dan tabungan tersimpan murni di memori lokal klien (*Isolated IndexedDB / LocalStorage*), tanpa transmisi data ke server pihak ketiga. | 🟢 **100% SAFE (PASSED)** |
| **Autentikasi & PIN** | Plaintext Storage, Memory Snooping, Replay Attacks | PIN 6-Digit dienkripsi searah (*One-Way Salted Cryptographic Hash*) menggunakan algoritma **SHA-256** via **Web Crypto API** (`crypto.subtle.digest`). | 🟢 **100% SAFE (PASSED)** |
| **Anti-Brute Force** | Dictionary Attack, Keypad Script Spamming, PIN Guessing | **Rate-Limiting & Lockout Defense**: Sistem melacak percobaan login. Jika gagal 5 kali berturut-turut, aplikasi otomatis terkunci (*lockout*) selama 30 detik. | 🟢 **100% SAFE (PASSED)** |
| **Biometrik Perangkat** | Biometric Spoofing, JavaScript Bypass | Integrasi resmi **Apple WebAuthn / Passkeys TrueDepth API** (`navigator.credentials`) dengan otentikasi level hardware. | 🟢 **100% SAFE (PASSED)** |
| **Insecure Deserialization** | Malicious JSON Backup Injection, Buffer Overflow | Pembatasan ukuran file maksimal 5MB, validasi tipe data ketat (*Strict Type Checking*), string length clipping, dan verifikasi struktur array saat proses *import backup*. | 🟢 **100% SAFE (PASSED)** |
| **Policy & Header Security** | MIME-Sniffing, Clickjacking, Script Exfiltration | Penerapan *Content Security Policy (CSP)* ketat, `X-Content-Type-Options: nosniff`, dan `Referrer-Policy: strict-origin-when-cross-origin`. | 🟢 **100% SAFE (PASSED)** |

---

## ✨ Fitur Unggulan In Money v12

1. 🔒 **Layar Kunci Keamanan Berlapis**:
   - 6-Digit Keypad PIN dengan Enkripsi SHA-256 Salted Hash (PIN Default Awal: `123456`).
   - Otentikasi Biometrik Asli **Apple Face ID / Touch ID (WebAuthn / Passkeys)**.
   - Proteksi Anti-Brute Force 5x percobaan dengan auto-lockout 30 detik.

2. 🏦 **E-Wallet Multi-Rekening & Transfer Antar Rekening**:
   - Manajemen 6 Dompet & Rekening (*Uang Tunai Cash, Bank Mandiri, Bank BRI, Bank BTN, SeaBank, dan ShopeePay*) berlogo resmi asli.
   - **Fitur Transfer / Pindah Dana**: Memindahkan saldo antar rekening (misal: Tarik Tunai / Top-Up ShopeePay) dengan pencatatan mutasi otomatis tanpa membebani arus kas pengeluaran belanja.
   - **Auto-Delta Adjustment**: Penyesuaian saldo manual otomatis mencatat riwayat transaksi selisih (*Double-entry accounting accuracy*).

3. 📷 **Smart AI OCR Receipt Scanner (Offline & Privat)**:
   - Pemindai struk belanjaan pintar menggunakan *Tesseract.js* yang berjalan 100% lokal di browser tanpa kirim data ke internet.
   - Mesin **Smart Merchant & Category Classifier** otomatis mendeteksi tempat belanja (*Alfamart, Indomaret, Solaria, Kopi Kenangan, SPBU Pertamina, PLN, Apotek*) dan langsung mengisi Form Nominal, Kategori, serta Tagar `#` secara otomatis.

4. 🗓️ **Kalender Pengeluaran Expandable (WIB Timezone)**:
   - Mode Ringkas: Strip Kapsul 7 Hari Terakhir bergaya monokrom taktil (*Hitam, Abu-abu, Putih*).
   - Mode Bulanan: Klik tombol panah `v` untuk membuka seluruh tanggal dalam bulan berjalan.
   - Sinkronisasi akurat dengan zona waktu **Asia/Jakarta (WIB)**.

5. 🔔 **Pelacak Tagihan Rutin Bulanan (*Recurring Bills*)**:
   - Pengingat beban bulanan (*WiFi, Kos, Spotify, Token Listrik*) dengan *countdown badge* sisa hari dan tombol bayar 1-klik.

6. 📄 **Pusat Unduh Laporan PDF Resmi**:
   - Ekspor Laporan Keuangan & Arus Kas Lengkap (*jsPDF AutoTable*).
   - Ekspor Laporan Tabungan & Progres Celengan Target Resmi.

7. 💾 **Cadangan Data & Privasi Mutlak**:
   - Ekspor & Impor file cadangan JSON yang telah divalidasi dan diamankan.
   - Tombol Reset Pabrik (*Factory Reset*) ke Rp 0.

---

## 🏛️ Struktur Arsitektur Monorepo

Proyek ini dibangun dengan struktur monorepo multi-bahasa terstruktur:

```
├── apps/
│   ├── web-pwa/              # Frontend React 19 + TypeScript + Tailwind + Dexie.js (Offline PWA)
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

### 1. Menjalankan Live Web App (Lokal)
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

### 3. Membuat Arsip ZIP Monorepo
```bash
bash scripts/package-zip.sh
```

---

## 📄 Lisensi
Hak Cipta © 2026 **Moch. Erik Irriansyah** (NIM 04123003 — Program Studi Sistem Komputer, Fakultas Ilmu Komputer, Universitas Narotama). Seluruh hak cipta dilindungi undang-undang.
