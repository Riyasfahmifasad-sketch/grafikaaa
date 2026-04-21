const ctx = document.getElementById("progressChart").getContext("2d");

let dataNilai = [65, 72, 80];
let labelWaktu = ["Tes 1", "Tes 2", "Tes 3"];

const chart = new Chart(ctx, {
  type: "line",
  data: {
    labels: labelWaktu,
    datasets: [
      {
        label: "Nilai Siswa",
        data: dataNilai,
        borderWidth: 2,
        tension: 0.3,
      },
    ],
  },
  options: {
    responsive: true,
  },
});

function tambahData() {
  const input = document.getElementById("nilaiInput");
  const nilaiBaru = parseInt(input.value);

  if (!nilaiBaru) return;

  dataNilai.push(nilaiBaru);
  labelWaktu.push("Tes " + dataNilai.length);

  chart.update();

  buatRekomendasi();

  input.value = "";
}

function buatRekomendasi() {
  let n = dataNilai.length;
  let terakhir = dataNilai[n - 1];
  let sebelumnya = dataNilai[n - 2] || terakhir;
  let rataRata = dataNilai.reduce((a, b) => a + b, 0) / n;

  let pesan = "";
  let statusIcon = "🚀";

  // 1. Logika Berdasarkan Skor Terakhir
  if (terakhir < 70) {
    pesan =
      "Fokus pada penguatan konsep dasar. Kami sarankan menonton video tutorial dasar sebelum lanjut.";
    statusIcon = "📚";
  } else if (terakhir <= 85) {
    pesan =
      "Pertahankan! Kamu sudah di jalur yang benar. Coba tantang dirimu dengan soal variasi.";
    statusIcon = "✏️";
  } else {
    pesan =
      "Luar biasa! Kamu sudah menguasai materi ini. Saatnya mencoba metode pengajaran untuk memperdalam pemahaman.";
    statusIcon = "🌟";
  }

  // 2. Analisis Tren (Trend Analysis)
  let trenPesan = "";
  if (n > 1) {
    if (terakhir > sebelumnya) {
      trenPesan = `<div style="color: #4ade80; margin-top: 10px;">📈 <b>Peningkatan:</b> Kamu naik ${terakhir - sebelumnya} poin! Pertahankan momentum ini.</div>`;
    } else if (terakhir < sebelumnya) {
      trenPesan = `<div style="color: #fb7185; margin-top: 10px;">📉 <b>Penurunan:</b> Turun ${sebelumnya - terakhir} poin. Jangan menyerah, istirahat sejenak lalu tinjau kembali materi sebelumnya.</div>`;
    } else {
      trenPesan = `<div style="color: #fbbf24; margin-top: 10px;">📊 <b>Stabil:</b> Skor kamu tetap. Coba cari metode belajar baru untuk menembus batasmu!</div>`;
    }
  }

  // 3. Rekomendasi Strategi (Berdasarkan Rata-Rata)
  let strategi = "";
  if (rataRata > 80) {
    strategi = `<div style="font-size: 0.85rem; opacity: 0.8; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 10px; margin-top: 10px;">
            <b>Tips Expert:</b> Gunakan teknik Spaced Repetition untuk menjaga ingatan jangka panjang.
        </div>`;
  } else {
    strategi = `<div style="font-size: 0.85rem; opacity: 0.8; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 10px; margin-top: 10px;">
            <b>Tips Pemula:</b> Gunakan teknik Pomodoro (25 menit belajar, 5 menit istirahat) agar tetap fokus.
        </div>`;
  }

  // Update tampilan
  document.getElementById("rekomendasi").innerHTML = `
        <strong>${statusIcon} Analisis AI:</strong> ${pesan}
        ${trenPesan}
        ${strategi}
    `;
}

// jalan pertama kali
buatRekomendasi();
