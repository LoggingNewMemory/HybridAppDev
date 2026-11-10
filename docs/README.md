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

## Penjelasan Konsep React Native (Jawaban LO 1)
React Native adalah *framework* buatan Meta yang memungkinkan pengembang untuk membangun aplikasi seluler asli (*native*) untuk iOS dan Android menggunakan bahasa JavaScript dan pustaka React. Berbeda dengan aplikasi web berbasis WebView, React Native memanggil *render API native* dari masing-masing OS (seperti UI View di iOS atau Android), sehingga performa dan pengalaman penggunanya terasa seperti aplikasi *native* sungguhan. 

**3 Keunggulan Utama React Native untuk Aplikasi Hybrid:**
1. **Cross-Platform:** Satu basis kode (JavaScript/TypeScript) dapat dikompilasi dan dijalankan untuk dua platform sekaligus (iOS dan Android), menghemat waktu dan biaya pengembangan secara drastis.
2. **Fast Refresh / Hot Reloading:** Perubahan pada UI dapat langsung terlihat di layar perangkat atau emulator dalam hitungan detik tanpa perlu melakukan proses *rebuild* (kompilasi ulang) aplikasi dari awal.
3. **Ekosistem yang Kaya:** Didukung oleh komunitas masif serta integrasi mulus dengan *library* modern, seperti Expo Router untuk navigasi tingkat lanjut dan NativeWind untuk penulisan *styling* yang efisien.

**Implementasi Komponen, Props, State, dan Navigasi (Dengan Contoh Kode):**
Di dalam proyek ini, konsep fundamental React Native diaplikasikan secara langsung pada kode sumber:

**1. Komponen & Props**
UI dipecah menjadi komponen modular (*Reusable Component*) agar penulisan kode lebih efisien dan terstruktur. Contohnya pada `CourseCard.tsx`, komponen dibangun untuk menerima data eksternal melalui *Props* (seperti `title`, `description`, `progress`, dll) agar kartunya dapat dirender secara dinamis.
```tsx
// Cuplikan dari src/components/CourseCard.tsx
type CourseCardProps = {
    icon: string;
    title: string;
    progress: number;
    // ... props lainnya
};

export default function CourseCard({ icon, title, progress }: CourseCardProps) {
    return (
        <View className="bg-white rounded-2xl p-4">
            <Text className="text-base font-bold">{title}</Text>
            <Text className="text-xs">{progress}%</Text>
        </View>
    );
}
```

**2. State**
State digunakan untuk menyimpan data lokal yang berubah berdasarkan interaksi pengguna. Pada halaman Login (`index.tsx`), *Hooks* `useState` digunakan untuk merekam ketikan pengguna pada form otentikasi guna keperluan validasi input sederhana.
```tsx
// Cuplikan dari src/app/index.tsx
import { useState } from "react";
import { TextInput } from "react-native";

export default function Index() {
  const [email, setEmail] = useState("");

  return (
    <TextInput
      value={email}
      onChangeText={setEmail}
      placeholder="nama@sekolah.sch.id"
    />
  );
}
```

**3. Navigasi**
Proyek ini mengadopsi sistem *file-based routing* menggunakan **Expo Router**. Perpindahan antar layar dapat dilakukan secara langsung dengan memanggil metode `push` atau `back` pada objek `router` tanpa perlu mendaftarkan konfigurasi *Navigation Stack* yang panjang.
```tsx
// Cuplikan dari src/app/index.tsx dan detail_materi.tsx
import { router } from "expo-router";

// Contoh Navigasi ke halaman utama
const handleLogin = () => {
    router.push('/homepage'); 
};

// Contoh Navigasi kembali (Back)
<TouchableOpacity onPress={() => router.back()}>
    <Text>← Kembali</Text>
</TouchableOpacity>
```

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

## Video Demo & Presentasi
https://drive.google.com/file/d/1-goMx9WUbGiG4Mt1NMLvu4yYDF3CBM7C/view?usp=sharing