# Ujian UTS - COMP6923051 Hybrid Application Development

## Identitas
- **Nama:** Albert Wesley Dion Tjakrawinata
- **NIM:** 2802493090
- **Kelas:** LA95

## Tema Aplikasi
**Education** - Platform Edukasi All in One untuk membantu siswa belajar & memantau progress belajar secara interaktif

## Cara Menjalankan Aplikasi
1. Pastikan Node.js dan Git sudah terinstal.
2. Clone repositori ini: `git clone [LINK_REPO_KAMU]`
3. Masuk ke folder proyek: `cd [NAMA_FOLDER]`
4. Instal dependensi: `npm install`
5. Jalankan server Expo: `npx expo start -c`
6. Scan QR Code menggunakan aplikasi Expo Go di HP, atau tekan `a` untuk membuka di Emulator Android.

---

## Penjelasan Konsep React Native
React Native adalah *framework* buatan Meta yang memungkinkan pengembang untuk membangun aplikasi seluler asli (*native*) untuk iOS dan Android menggunakan bahasa JavaScript dan pustaka React. Berbeda dengan aplikasi web berbasis WebView, React Native memanggil *render API native* dari platform (seperti UI View di iOS atau Android), sehingga performa dan tampilannya terasa seperti aplikasi *native* sungguhan. 

**3 Keunggulan Utama React Native untuk Aplikasi Hybrid:**
1. **Cross-Platform:** Satu basis kode (JavaScript/TypeScript) dapat dikompilasi dan dijalankan untuk dua platform sekaligus (iOS dan Android), menghemat waktu dan biaya pengembangan secara drastis.
2. **Fast Refresh / Hot Reloading:** Perubahan pada kode UI dapat langsung terlihat di layar perangkat atau emulator dalam hitungan detik tanpa perlu melakukan proses *rebuild* (kompilasi ulang) aplikasi secara penuh.
3. **Ekosistem yang Kaya:** Didukung oleh komunitas yang sangat masif serta integrasi mulus dengan *library* Node.js, seperti Expo Router, NativeWind (Tailwind CSS), dan React Navigation.

**Implementasi Komponen, Props, State, dan Navigasi:**
Dalam proyek ini, konsep fundamental React diaplikasikan sebagai berikut:
- **Komponen & Props:** UI dipecah menjadi komponen modular (Reusable Component). Contohnya adalah `CourseCard.tsx`. Komponen ini menerima *Props* statis dari luar (seperti `title`, `description`, `progress`, dan `icon`) untuk menampilkan kartu pelajaran yang berbeda-beda secara dinamis tanpa penulisan kode berulang.
- **State:** Menggunakan *Hooks* `useState` pada halaman Belajar (`belajar.tsx`) untuk menyimpan state filter (`activeFilter`). Ketika tombol kategori ditekan, state berubah, dan UI secara otomatis melakukan *render ulang* untuk hanya menampilkan kartu yang sesuai dengan kategori (Semua, Saintek, Bahasa).
- **Navigasi:** Menggunakan **Expo Router** (*file-based routing*). Perpindahan antar layar tidak memerlukan konfigurasi *stack* manual yang rumit. Cukup memanggil `router.push('/detail_materi')` pada komponen `TouchableOpacity`, pengguna akan langsung diarahkan ke file rute yang sesuai di dalam folder `app/`.

---

## Analisis Kebutuhan (Jawaban LO 3)
- **Masalah:** Banyak pelajar kesulitan melacak modul mana yang sudah selesai dan mana yang masih tertunda, serta tidak memiliki antarmuka yang terpusat untuk melihat progres belajar mereka secara detail.
- **Target Pengguna:** Pelajar SMA/Sederajat dan Mahasiswa yang membutuhkan manajemen materi pembelajaran interaktif.

**Kebutuhan Pengguna (Minimal 5):**
1. Pengguna dapat melakukan autentikasi (login/register) ke dalam sistem edukasi.
2. Pengguna dapat melihat ringkasan materi dan progres belajar harian di beranda.
3. Pengguna dapat menyaring/memfilter materi berdasarkan kategori (Saintek/Bahasa).
4. Pengguna dapat melihat detail modul pelajaran (pendahuluan dan daftar sub-materi).
5. Pengguna dapat melihat informasi profil akademik mereka dan keluar dari sistem.

**Tabel Pemetaan Kebutuhan ke Layar:**

| No | Kebutuhan Pengguna | Implementasi Layar | Komponen Terkait |
|---|---|---|---|
| 1 | Autentikasi Sistem | `index.tsx` (Login) | `TextInput`, `TouchableOpacity` |
| 2 | Beranda & Progres Utama | `homepage.tsx` | `CourseCard`, `ScrollView`, `Bottom Navigation` |
| 3 | Filter Kategori Materi | `belajar.tsx` | `useState`, Filter Buttons, `CourseCard` |
| 4 | Detail Modul Pelajaran | `detail_materi.tsx` | `ScrollView`, Action Buttons, Tombol Back |
| 5 | Manajemen Profil Akademik | `profile.tsx` | `Image`, `TouchableOpacity` (Logout) |

**Alasan Keputusan Desain & Rencana Pengembangan:**
- **Keputusan Desain:** Menggunakan pendekatan UI yang *clean*, terang (latar `#fcf8ff`), dengan aksen ungu (`#5849c0`) agar terkesan ramah dan modern bagi pelajar. *Bottom Navigation* dibuat mengambang (melayang dengan *padding bottom* mengikuti *safe area insets*) agar terlihat elegan dan tidak tertutup *gesture bar* bawaan OS. Penggunaan komponen statis di luar *root* juga memudahkan pemeliharaan kode.
- **Rencana Pengembangan:** Mengintegrasikan autentikasi sungguhan menggunakan Firebase Auth, menghubungkan `CourseCard` dengan *database backend* (API REST/GraphQL) agar progres 65% tidak lagi *hardcoded*, serta menambahkan fitur pemutar video pada `detail_materi.tsx`.

---

## Video Demo
