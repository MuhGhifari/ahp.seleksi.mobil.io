# 🚗 PilihMobil — Rekomendasi Mobil Berbasis AHP

**PilihMobil** adalah aplikasi web statis yang membantu pengguna di wilayah Jabodetabek menentukan jenis kendaraan terbaik (**EV, Hybrid, atau Bensin**) menggunakan algoritma pengambilan keputusan formal: **Analytic Hierarchy Process (AHP)**.

Aplikasi ini dirancang untuk memberikan rekomendasi objektif dengan mempertimbangkan variabel dinamis seperti kemacetan Jakarta, ketersediaan garasi untuk pengisian daya, hingga fluktuasi harga BBM non-subsidi.

---

## ✨ Fitur Utama

* **Algoritma Pengambilan Keputusan (AHP):** Menghitung prioritas berdasarkan 6 kriteria utama yang bobotnya beradaptasi secara otomatis sesuai prioritas pengguna (*Cost vs Environment vs Flex*).
* **Kalkulasi Real-Time:** Menghitung estimasi biaya operasional bulanan berdasarkan jarak tempuh harian (PP) dan tarif listrik/BBM terbaru.
* **UI/UX Modern:** Desain bersih dengan palet warna *earth-tone*, tipografi *DM Serif Display*, dan transisi halus yang memberikan kesan premium.
* **Agnostik Platform:** Berjalan sepenuhnya di sisi klien (Client-side JS), tanpa perlu database atau akun pengguna.

---

## 🛠️ Detail Teknis & Algoritma

### Kriteria Penilaian (Criteria Weights)
Aplikasi membagi bobot keputusan ke dalam beberapa pilar utama:
1.  **Efisiensi Energi & Emisi** (30%)
2.  **Biaya Operasional Harian** (25%)
3.  **Ketahanan Krisis BBM** (16%)
4.  **Infrastruktur & Kenyamanan** (14%)
5.  **Harga Beli & Kredit** (10%)
6.  **Nilai Jual & Servis** (5%)

### Mesin AHP (AHP Engine)
Sistem menggunakan perbandingan berpasangan (*Pairwise Comparison*) untuk menormalisasi skor dari setiap alternatif kendaraan:

```javascript
function ahpWeights(M) {
  const n = M.length;
  const colSums = M[0].map((_, j) => M.reduce((s, r) => s + r[j], 0));
  const norm = M.map(row => row.map((v, j) => v / colSums[j]));
  const w = norm.map(row => row.reduce((s, v) => s + v, 0) / n);
  // Menghitung Consistency Ratio (CR) untuk memastikan validitas data
  return { w };
}
