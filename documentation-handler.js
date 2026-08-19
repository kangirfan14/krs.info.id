// Fungsi utama yang dipanggil saat tombol "Lihat Dokumentasi" ditekan
function bukaDokumentasi(link) {
  // Buat atau tampilkan elemen modal overlay di halaman dengan font formal
  let modal = document.getElementById("krsDocModal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "krsDocModal";
    modal.style.cssText = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6); z-index:9999; display:flex; justify-content:center; align-items:center; font-family:'Plus Jakarta Sans', sans-serif;";
    document.body.appendChild(modal);
  }

  // Bersihkan timer sebelumnya jika ada
  const activeTimer = modal.getAttribute("data-timer");
  if (activeTimer) {
    clearInterval(activeTimer);
    modal.removeAttribute("data-timer");
  }

  modal.style.display = "flex";

  // --- TAHAP 1: Menghubungkan ke server ---
  modal.innerHTML = `
    <div style="background:#ffffff; padding:35px 30px; border-radius:16px; text-align:center; max-width:420px; width:90%; box-shadow:0 10px 30px rgba(0,0,0,0.15); border: 1px solid #e2e8f0;">
      <div style="font-size:2rem; color:#8b0000; margin-bottom:15px;"><i class="fa-solid fa-server fa-beat"></i></div>
      <div style="font-weight:700; font-size:1.1rem; color:#0f172a; margin-bottom:6px;">Menghubungkan ke server...</div>
      <div style="font-size:0.85rem; color:#64748b; font-weight:500;">Memulai mencari sumber link dokumentasi.</div>
    </div>
  `;

  // Jeda agak lama (1.8 detik) sebelum lanjut ke tahap berikutnya
  setTimeout(() => {
    // --- TAHAP 2: Mencari sumber link ---
    modal.innerHTML = `
      <div style="background:#ffffff; padding:35px 30px; border-radius:16px; text-align:center; max-width:420px; width:90%; box-shadow:0 10px 30px rgba(0,0,0,0.15); border: 1px solid #e2e8f0;">
        <div style="font-size:2rem; color:#8b0000; margin-bottom:15px;"><i class="fa-solid fa-magnifying-glass-chart fa-spin"></i></div>
        <div style="font-weight:700; font-size:1.1rem; color:#0f172a; margin-bottom:6px;">Mencari sumber link...</div>
        <div style="font-size:0.85rem; color:#64748b; font-weight:500;">Memindai link dokumentasi.</div>
      </div>
    `;

    setTimeout(() => {
      // Validasi ketersediaan link
      const cleanLink = link ? link.trim() : "";
      const isLinkValid = cleanLink !== "" && cleanLink !== "#" && cleanLink !== "undefined" && cleanLink !== "null";

      if (isLinkValid) {
        // --- KONDISI A: JIKA LINK ADA ---
        
        // Tahap A.1: Sumber dokumentasi ditemukan
        modal.innerHTML = `
          <div style="background:#ffffff; padding:35px 30px; border-radius:16px; text-align:center; max-width:420px; width:90%; box-shadow:0 10px 30px rgba(0,0,0,0.15); border: 1px solid #e2e8f0;">
            <div style="font-size:2rem; color:#16a34a; margin-bottom:15px;"><i class="fa-solid fa-circle-check"></i></div>
            <div style="font-weight:700; font-size:1.1rem; color:#0f172a; margin-bottom:6px;">Sumber dokumentasi ditemukan</div>
            <div style="font-size:0.85rem; color:#64748b; font-weight:500;">Tautan valid teridentifikasi.</div>
          </div>
        `;

        setTimeout(() => {
          // Tahap A.2: Terhubung ke server & Membuka link
          modal.innerHTML = `
            <div style="background:#ffffff; padding:35px 30px; border-radius:16px; text-align:center; max-width:420px; width:90%; box-shadow:0 10px 30px rgba(0,0,0,0.15); border: 1px solid #e2e8f0;">
              <div style="font-size:2rem; color:#2563eb; margin-bottom:15px;"><i class="fa-solid fa-external-link-alt fa-bounce"></i></div>
              <div style="font-weight:700; font-size:1.1rem; color:#0f172a; margin-bottom:6px;">Terhubung ke server</div>
              <div style="font-size:0.85rem; color:#16a34a; font-weight:600;">Membuka tautan dokumentasi...</div>
            </div>
          `;

          setTimeout(() => {
            // Menggunakan teknik pembuatan elemen link tak terlihat yang diklik otomatis oleh script
            // agar browser tidak menganggapnya sebagai popup ilegal/terblokir setelah setTimeout panjang.
            const tempAnchor = document.createElement("a");
            tempAnchor.href = cleanLink;
            tempAnchor.target = "_blank";
            tempAnchor.rel = "noopener noreferrer";
            document.body.appendChild(tempAnchor);
            tempAnchor.click();
            document.body.removeChild(tempAnchor);

            tutupPanelKrs();
          }, 1500);

        }, 1800);

      } else {
        // --- KONDISI B: JIKA LINK TIDAK ADA ---

        // Tahap B.1: Sumber dokumentasi tidak ditemukan
        modal.innerHTML = `
          <div style="background:#ffffff; padding:35px 30px; border-radius:16px; text-align:center; max-width:440px; width:90%; box-shadow:0 10px 30px rgba(0,0,0,0.15); border: 1px solid #e2e8f0;">
            <div style="font-size:2rem; color:#dc2626; margin-bottom:15px;"><i class="fa-solid fa-circle-exclamation"></i></div>
            <div style="font-weight:700; font-size:1.1rem; color:#0f172a; margin-bottom:6px;">Sumber dokumentasi tidak ditemukan</div>
            <div style="font-size:0.85rem; color:#64748b; font-weight:500;">Tautan untuk kegiatan ini belum tersedia.</div>
          </div>
        `;

        setTimeout(() => {
          // Tahap B.2: Menampilkan pesan lengkap dan hitung mundur kembali ke beranda
          let countdown = 5;

          modal.innerHTML = `
            <div style="background:#ffffff; padding:30px; border-radius:16px; text-align:left; max-width:480px; width:90%; box-shadow:0 10px 30px rgba(0,0,0,0.15); border: 1px solid #e2e8f0;">
              <div style="display:flex; align-items:center; gap:10px; margin-bottom:12px; color:#8b0000; font-size:1.2rem;">
                <i class="fa-solid fa-triangle-exclamation"></i>
                <span style="font-weight:700; font-size:1rem; color:#0f172a;">Dokumentasi Tidak Ditemukan</span>
              </div>
              <div style="font-size:0.9rem; color:#334155; line-height:1.6; margin-bottom:20px; font-weight:400;">
                Mohon maaf, Silakan hubungi panitia yang bersangkutan untuk informasi lebih lanjut.
              </div>
              <button onclick="tutupPanelKrs()" style="width:100%; padding:11px 20px; background:#0f172a; color:#fff; border:none; border-radius:8px; font-weight:600; font-size:0.9rem; cursor:pointer; transition:background 0.2s;">
                Kembali ke Beranda (<span id="countdownTimer">${countdown}</span>s)
              </button>
            </div>
          `;

          const countdownInterval = setInterval(() => {
            countdown--;
            const timerSpan = document.getElementById("countdownTimer");
            if (timerSpan) {
              timerSpan.innerText = countdown;
            }

            if (countdown <= 0) {
              clearInterval(countdownInterval);
              tutupPanelKrs();
            }
          }, 1000);

          modal.setAttribute("data-timer", countdownInterval);

        }, 1800);
      }

    }, 1800);

  }, 1800);
}

// Fungsi untuk menutup panel/modal dan membersihkan timer
function tutupPanelKrs() {
  const modal = document.getElementById("krsDocModal");
  if (modal) {
    const activeTimer = modal.getAttribute("data-timer");
    if (activeTimer) {
      clearInterval(activeTimer);
    }
    modal.style.display = "none";
  }
}
