# 🍽️ Split Bill Calculator

Aplikasi kalkulator split bill sederhana yang membantu menghitung pembagian tagihan dengan akurat, termasuk PPN, service charge, tips, dan diskon.

## ✨ Fitur Utama

### 🧮 Kalkulasi Dasar
- **Total Tagihan**: Input total harga makanan
- **PPN**: Pajak Pertambahan Nilai (default 11%)
- **Service Charge**: Biaya pelayanan (default 10%)
- **Tips**: Persentase tips (default 5%)
- **Diskon**: Potongan harga (jika ada)
- **Jumlah Orang**: Pembagian tagihan

### 🎯 Fitur Lanjutan
- **Split Tidak Merata**: Untuk kasus dimana ada yang makan lebih banyak/sedikit
- **Riwayat Perhitungan**: Simpan dan gunakan kembali perhitungan sebelumnya
- **Format Rupiah**: Tampilan mata uang Indonesia yang rapi
- **Responsif**: Bekerja dengan baik di desktop dan mobile

### ⌨️ Shortcut Keyboard
- `Ctrl/Cmd + Enter`: Simpan perhitungan
- `Escape`: Reset form

## 🚀 Cara Menggunakan

### 1. Kalkulasi Dasar
1. Masukkan **Total Tagihan** (harga makanan)
2. Sesuaikan **PPN** (default 11%)
3. Sesuaikan **Service Charge** (default 10%)
4. Masukkan **Diskon** jika ada
5. Pilih **Jumlah Orang**
6. Sesuaikan **Tips** (default 5%)
7. Lihat hasil perhitungan otomatis

### 2. Split Tidak Merata
1. Klik **"Aktifkan Split Tidak Merata"**
2. Masukkan nama dan jumlah yang dimakan setiap orang
3. Aplikasi akan menghitung proporsi pembayaran berdasarkan jumlah yang dimakan

### 3. Simpan Riwayat
1. Klik **"Simpan Perhitungan Ini"** untuk menyimpan
2. Lihat riwayat di bagian bawah
3. Klik **"Gunakan Lagi"** untuk memuat perhitungan sebelumnya

## 📱 Tampilan

Aplikasi memiliki desain modern dengan:
- **Gradient Background**: Tampilan yang menarik
- **Card Layout**: Informasi terorganisir dengan baik
- **Color Coding**: 
  - Biru untuk total tagihan
  - Hijau untuk per orang
  - Merah untuk diskon
- **Animasi**: Transisi halus dan feedback visual
- **Responsif**: Menyesuaikan dengan ukuran layar

## 🛠️ Teknologi

- **HTML5**: Struktur semantik
- **CSS3**: Styling modern dengan Flexbox dan Grid
- **JavaScript ES6+**: Logika aplikasi
- **LocalStorage**: Penyimpanan riwayat lokal
- **Intl API**: Format mata uang Indonesia

## 📊 Contoh Perhitungan

### Skenario 1: Makan Bersama 4 Orang
- Total Tagihan: Rp 200.000
- PPN: 11%
- Service Charge: 10%
- Tips: 5%
- Diskon: Rp 20.000

**Hasil:**
- Subtotal: Rp 200.000
- PPN: Rp 22.000
- Service Charge: Rp 20.000
- Tips: Rp 10.000
- Diskon: -Rp 20.000
- **Total: Rp 232.000**
- **Per Orang: Rp 58.000**

### Skenario 2: Split Tidak Merata
- Total: Rp 150.000
- Andi makan: Rp 60.000 (40%)
- Budi makan: Rp 40.000 (27%)
- Cici makan: Rp 50.000 (33%)

**Hasil:**
- Andi bayar: Rp 60.000
- Budi bayar: Rp 40.000
- Cici bayar: Rp 50.000

## 🔧 Instalasi

1. Clone atau download repository ini
2. Buka file `index.html` di browser
3. Aplikasi siap digunakan!

## 📝 Catatan

- Aplikasi menggunakan **localStorage** untuk menyimpan riwayat
- Data tersimpan di browser lokal
- Tidak ada data yang dikirim ke server
- Bekerja offline tanpa internet

## 🎨 Customization

Anda dapat menyesuaikan:
- **Warna**: Edit variabel CSS di `styles.css`
- **Default Values**: Ubah nilai default di `script.js`
- **Currency**: Ganti format mata uang di fungsi `formatCurrency()`

## 🤝 Kontribusi

Silakan berkontribusi dengan:
- Melaporkan bug
- Menambahkan fitur baru
- Memperbaiki dokumentasi
- Meningkatkan UI/UX

## 📄 Lisensi

Aplikasi ini dibuat untuk tujuan edukasi dan penggunaan pribadi.

---

**Dibuat dengan ❤️ untuk memudahkan pembagian tagihan** 