// 1. Fungsi Utama saat Tombol Dokumentasi Diklik
function cekDanBukaDokumentasi(ada, linkTarget) {
  tampilkanPanelInteraktif(ada, linkTarget);
}

// 2. Fungsi Animasi Server & Panel Interaktif
function tampilkanPanelInteraktif(ada, linkTarget) {
  // Hapus modal lama jika ada
  const existing = document.getElementById("modalSistemKrs");
  if (existing) existing.remove();

  const overlay = document.createElement("div");
  overlay.id = "modalSistemKrs";
  overlay.innerHTML = `
    <style>
      .krs-overlay {
        position: fixed; inset: 0; background: rgba(15, 23, 42, 0.7);
        z-index: 99999; display: flex; justify-content: center; align-items: center;
        padding: 20px; backdrop-filter: blur(6px); animation: fadeInKrs 0.3s ease;
      }
      .krs-card {
        background: #ffffff; border-radius: 24px; width: 100%; max-width: 400px;
        padding: 32px 24px; text-align: center; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        font-family: inherit; position: relative; overflow: hidden;
      }
      .krs-spinner {
        width: 50px; height: 50px; border: 4px solid #f1f5f9; border-top: 4px solid #b91c1c;
        border-radius: 50%; animation: spinKrs 1s linear infinite; margin: 0 auto 20px auto;
      }
      .krs-status-text {
        font-size: 0.95rem; font-weight: 600; color: #334155; min-height: 28px;
        transition: opacity 0.2s ease;
      }
      .krs-icon-notfound {
        font-size: 3rem; color: #b91c1c; margin-bottom: 16px;
      }
      .krs-title-notfound {
        font-size: 1.25rem; font-weight: 700; color: #0f172a; margin-bottom: 10px;
      }
      .krs-desc-notfound {
        font-size: 0.85rem; color: #64748b; line-height: 1.5; margin-bottom: 24px;
      }
      .krs-btn-home {
        background: #0f172a; color: #ffffff; border: none; width: 100%; padding: 12px;
        border-radius: 12px; font-weight: 700; font-size: 0.9rem; cursor: pointer;
        transition: background 0.2s; box-shadow: 0 4px 12px rgba(15, 23, 42, 0.2);
      }
      .krs-btn-home:hover { background: #1e293b; }
      @keyframes spinKrs { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      @keyframes fadeInKrs { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
    </style>

    <div class="krs-overlay">
      <div class="krs-card" id="krsCardContent">
        <div class="krs-spinner"></div>
        <div class="krs-status-text" id="krsStatusText">Mencoba menghubungkan ke server...</div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  const statusEl = document.getElementById("krsStatusText");
  const cardContent = document.getElementById("krsCardContent");

  // Tahapan Teks Loading Bertahap Sesuai Request
  setTimeout(() => {
    statusEl.style.opacity = 0;
    setTimeout(() => {
      statusEl.innerText = "Mencari lokasi link...";
      statusEl.style.opacity = 1;
    }, 200);
  }, 800);

  setTimeout(() => {
    statusEl.style.opacity = 0;
    setTimeout(() => {
      statusEl.innerText = "Terhubung ke server...";
      statusEl.style.opacity = 1;
    }, 200);
  }, 1600);

  setTimeout(() => {
    statusEl.style.opacity = 0;
    setTimeout(() => {
      statusEl.innerText = "Mengambil data dokumentasi...";
      statusEl.style.opacity = 1;
    }, 200);
  }, 2400);

  // Eksekusi Akhir Setelah ~3.2 Detik
  setTimeout(() => {
    if (ada && linkTarget && linkTarget.trim() !== "") {
      statusEl.innerText = "Berhasil! Mengalihkan...";
      setTimeout(() => {
        window.open(linkTarget, "_blank");
        tutupPanelKrs();
      }, 500);
    } else {
      // Ubah modal loading menjadi halaman maaf jika false / link kosong
      cardContent.innerHTML = `
        <div class="krs-icon-notfound"><i class="fa-solid fa-folder-open"></i></div>
        <div class="krs-title-notfound">Dokumentasi Belum Ditemukan</div>
        <div class="krs-desc-notfound">
          Mohon maaf, pemilik website belum mendapatkan kepastian atau tautan resmi untuk dokumentasi acara ini.<br><br>
          Silakan hubungi panitia yang bersangkutan untuk informasi lebih lanjut.
        </div>
        <button class="krs-btn-home" onclick="tutupPanelKrs()">Kembali ke Beranda</button>
      `;
    }
  }, 3200);
}

// 3. Fungsi Tutup Panel
function tutupPanelKrs() {
  const modal = document.getElementById("modalSistemKrs");
  if (modal) modal.remove();
}