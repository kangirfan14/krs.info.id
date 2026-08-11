// ==========================================
// KONTROL PROTOKOLER & LEMBAR PERSETUJUAN LEGAL
// ==========================================

window._linkTujuanFormSementara = "";

function bukaModalProtokol(linkTujuanForm, callbackSelesai) {
  if (document.getElementById("modalProtokolLegal")) return;

  window._linkTujuanFormSementara = linkTujuanForm;
  window._callbackProtokolSelesai = callbackSelesai;

  if (!document.getElementById("styleProtokolLegal")) {
    const style = document.createElement("style");
    style.id = "styleProtokolLegal";
    style.innerHTML = `
      .protocol-box {
        background: #ffffff; border-radius: 16px;
        max-width: 550px; width: 100%; max-height: 90vh;
        display: flex; flex-direction: column; overflow: hidden; position: relative;
        box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
        animation: popInLegal 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      }

      /* OVERLAY SPINNER/LOADING DENGAN TRANSISI JOYFUL */
      .proto-loading-overlay {
        position: absolute; inset: 0;
        background: #ffffff; z-index: 99; display: flex; flex-direction: column;
        justify-content: center; align-items: center; border-radius: 16px;
        padding: 24px; text-align: center; box-sizing: border-box;
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .icon-wrapper-krs {
        position: relative; width: 76px; height: 76px; display: flex;
        justify-content: center; align-items: center; margin-bottom: 16px;
      }
      .joyful-spinner-krs {
        position: absolute; width: 100%; height: 100%; border-radius: 50%;
        border: 4px solid #f1f5f9; border-top-color: #d32f2f; border-right-color: #38bdf8;
        animation: spinJoyful 0.9s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
      }
      @keyframes spinJoyful {
        0% { transform: rotate(0deg) scale(1); }
        50% { transform: rotate(180deg) scale(1.1); }
        100% { transform: rotate(360deg) scale(1); }
      }
      
      .check-circle-krs {
        width: 68px; height: 68px; background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        border-radius: 50%; display: flex; justify-content: center; align-items: center;
        transform: scale(0) rotate(-45deg); opacity: 0;
        transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease;
        box-shadow: 0 12px 25px rgba(16, 185, 129, 0.4);
      }
      .check-circle-krs svg {
        width: 36px; height: 36px; stroke: #ffffff; stroke-width: 4;
        stroke-dasharray: 60; stroke-dashoffset: 60;
        transition: stroke-dashoffset 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.15s;
      }
      .icon-wrapper-krs.success .joyful-spinner-krs {
        transform: scale(0); opacity: 0; transition: all 0.3s ease;
      }
      .icon-wrapper-krs.success .check-circle-krs {
        transform: scale(1) rotate(0deg); opacity: 1;
      }
      .icon-wrapper-krs.success .check-circle-krs svg {
        stroke-dashoffset: 0;
      }
      
      .text-status-krs { font-size: 1rem; font-weight: 700; color: #1e293b; margin: 0; transition: all 0.3s ease; }
      .text-status-krs.pulse { animation: pulseText 1.2s infinite ease-in-out; }
      @keyframes pulseText { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(0.98); } }
      .text-sub-krs { font-size: 0.8rem; color: #64748b; margin-top: 6px; }

      .protocol-header {
        background: #1e293b; color: #ffffff; padding: 16px 20px;
        display: flex; align-items: center; justify-content: space-between;
        border-bottom: 3px solid #d32f2f;
      }
      .protocol-header h4 { margin: 0; font-size: 1.05rem; font-weight: 700; display: flex; align-items: center; gap: 8px; }
      .protocol-header .sub-head { font-size: 0.75rem; color: #94a3b8; margin-top: 2px; }
      
      .protocol-body {
        padding: 20px; overflow-y: auto; flex: 1; text-align: left;
        font-size: 0.85rem; color: #334155; line-height: 1.6;
        scroll-behavior: smooth; position: relative;
      }
      
      .protocol-content-wrapper { position: relative; margin-bottom: 16px; }
      .protocol-content-text {
        background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px;
        padding: 16px; max-height: 260px; overflow-y: auto;
        scroll-behavior: smooth;
      }
      .protocol-content-text::-webkit-scrollbar { width: 6px; }
      .protocol-content-text::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 4px; }
      .protocol-content-text::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
      .protocol-content-text::-webkit-scrollbar-thumb:hover { background: #94a3b8; }

      .protocol-content-text h5 { margin: 12px 0 4px 0; color: #0f172a; font-weight: 700; font-size: 0.9rem; }
      .protocol-content-text h5:first-child { margin-top: 0; }
      .protocol-content-text p { margin: 0 0 8px 0; }
      .protocol-content-text ul { margin: 0 0 10px 0; padding-left: 20px; }
      .protocol-content-text li { margin-bottom: 4px; }

      /* Animasi Denyut Konstan untuk Tombol Gulir Bawah */
      @keyframes denyutTombolScroll {
        0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(56, 189, 248, 0.7); }
        50% { transform: scale(1.08); box-shadow: 0 0 0 10px rgba(56, 189, 248, 0); }
        100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(56, 189, 248, 0); }
      }
      .btn-quick-scroll {
        position: absolute; right: 14px; bottom: 14px;
        background: #0f172a; color: #38bdf8; border: 1px solid #334155;
        padding: 6px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 600;
        cursor: pointer; display: flex; align-items: center; gap: 6px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.2); transition: all 0.3s ease; z-index: 10;
        animation: denyutTombolScroll 1.2s infinite ease-in-out;
        opacity: 1; visibility: visible;
      }
      .btn-quick-scroll.hidden {
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        transform: scale(0.8);
      }
      .btn-quick-scroll:hover {
        background: #1e293b; color: #ffffff; border-color: #38bdf8; transform: translateY(-2px);
      }
      
      .law-badge {
        background: #fef2f2; color: #991b1b; border: 1px solid #fecaca;
        padding: 8px 12px; border-radius: 8px; font-size: 0.78rem; margin-top: 10px; font-weight: 600;
      }

      .checklist-section {
        background: #f1f5f9; padding: 14px; border-radius: 10px;
        border: 1px solid #cbd5e1; display: flex; flex-direction: column; gap: 10px;
        transition: all 0.3s ease;
      }
      .check-item {
        display: flex; align-items: flex-start; gap: 10px; cursor: pointer;
        font-size: 0.82rem; color: #1e293b; font-weight: 500; user-select: none;
      }
      .check-item input[type="checkbox"] {
        width: 18px; height: 18px; margin-top: 2px; cursor: pointer; accent-color: #d32f2f;
      }
      .check-item input[type="checkbox"]:disabled {
        cursor: not-allowed; opacity: 0.6;
      }

      .protocol-footer {
        padding: 16px 20px; background: #ffffff; border-top: 1px solid #e2e8f0;
        display: flex; gap: 10px; justify-content: flex-end;
      }
      .btn-cancel-proto {
        background: #e2e8f0; color: #475569; border: none; padding: 10px 18px;
        border-radius: 10px; font-weight: 600; font-size: 0.85rem; cursor: pointer; transition: background 0.2s;
      }
      .btn-cancel-proto:hover { background: #cbd5e1; }
      
      .btn-proceed-proto {
        background: linear-gradient(135deg, #d32f2f 0%, #9a0007 100%);
        color: #ffffff; border: none; padding: 10px 20px; border-radius: 10px;
        font-weight: 700; font-size: 0.85rem; cursor: pointer; display: flex;
        align-items: center; gap: 8px; box-shadow: 0 4px 12px rgba(211, 47, 47, 0.3);
        transition: all 0.2s;
      }
      .btn-proceed-proto:disabled {
        background: #94a3b8 !important; color: #f1f5f9 !important;
        box-shadow: none !important; cursor: not-allowed; opacity: 0.7;
      }
      @keyframes popInLegal { 0% { transform: scale(0.8); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
    `;
    document.head.appendChild(style);
  }

  const protoWrapper = document.createElement("div");
  protoWrapper.id = "modalProtokolLegal";
  protoWrapper.className = "modal-17an-overlay";
  protoWrapper.innerHTML = `
    <div class="protocol-box">
      
      <!-- OVERLAY LOADING (MUNCUL PERTAMA KALI) -->
      <div id="loadingOverlayKrs" class="proto-loading-overlay">
        <div id="iconWrapperKrs" class="icon-wrapper-krs">
          <div class="joyful-spinner-krs"></div>
          <div class="check-circle-krs">
            <svg viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
        </div>
        <p id="textStatusKrs" class="text-status-krs pulse">Menghubungkan Ke Server...</p>
        <span id="textSubKrs" class="text-sub-krs">Meminta izin akses layanan</span>
      </div>

      <!-- ISI LEMBAR PROTOKOL -->
      <div class="protocol-header">
        <div>
          <h4><i class="fa-solid fa-shield-halved" style="color: #38bdf8;"></i> Lembar Wajib Dibaca & Setujui !</h4>
          <div class="sub-head">Keamanan Pengguna KRS.Info</div>
        </div>
      </div>

      <div class="protocol-body" id="protocolBodyContainer">
        
        <div class="protocol-content-wrapper">
          <div class="protocol-content-text" id="protocolTextContainer">
            <h5>1. Ketentuan Umum Publikasi</h5>
            <p>Setiap materi, judul, deskripsi, foto, dan video agenda warga yang dikirimkan melalui platform ini akan diproses untuk ditayangkan pada saluran media resmi <strong>krs.info</strong> (termasuk situs web dan jejaring media sosial resmi KRS.Info).</p>

            <h5>2. Lisensi & Hak Siar Multimedia</h5>
            <p>Dengan mengirimkan materi, Pengirim memberikan hak non-eksklusif, bebas royalti, dan lisensi publikasi penuh kepada pengelola krs.info untuk menyunting, mempublikasikan, dan mentayangkannya kembali demi kepentingan informasi masyarakat.</p>

            <h5>3. Larangan Konten & Etika Informasi</h5>
            <p>Materi yang dikirimkan <strong>DILARANG KERAS</strong> mengandung unsur :</p>
            <ul>
              <li>SARA (Suku, Agama, Ras, dan Antargolongan).</li>
              <li>Unsur Perjudian, Pornografi, atau Kekerasan.</li>
              <li>Berita Bohong (Hoax), Fitnah, Pencemaran Nama Baik, atau Ujaran Kebencian.</li>
              <li>Provokasi politik praktis atau muatan yang memecah belah keharmonisan warga Desa Karangsari.</li>
            </ul>

            <h5>4. Dasar Hukum & Ancam Kewajiban Legal</h5>
            <p>Pelanggaran terhadap materi informasi digital berada di bawah naungan hukum Republik Indonesia yang sah</p>
            <div class="law-badge">
              <i class="fa-solid fa-gavel"></i> <strong>Dasar Hukum Berlaku :</strong>
              <br>• <strong>UU ITE No. 11 Tahun 2008 & UU No. 1 Tahun 2024 (Pasal 27 & 28) :</strong> Sanksi pidana atas penyebaran informasi bohong, SARA, dan pencemaran nama baik di media elektronik.
              <br>• <strong>UU No. 28 Tahun 2014 tentang Hak Cipta :</strong> Pengirim wajib menjamin materi/foto yang dikirim adalah milik pribadi atau telah mendapat izin pemilik sah.
            </div>
          </div>

          <button id="btnQuickScroll" class="btn-quick-scroll" onclick="gulirKeBawahProtokol()">
            <i class="fa-solid fa-arrow-down"></i> Gulir Bawah
          </button>
        </div>

        <div class="checklist-section" id="checklistSectionTarget">
          <label class="check-item">
            <input type="checkbox" id="checkPersetujuan1" disabled onclick="cekKlikCheckboxSebelumScroll(event)" onchange="validasiChecklistProtokol()">
            <span>Saya telah membaca, memahami, dan menyetujui seluruh Protokoler & Ketentuan Publikasi di atas.</span>
          </label>
          <label class="check-item">
            <input type="checkbox" id="checkPersetujuan2" disabled onclick="cekKlikCheckboxSebelumScroll(event)" onchange="validasiChecklistProtokol()">
            <span>Saya menjamin materi yang dikirimkan adalah asli, bebas dari unsur SARA, HOAX, serta bertanggung jawab penuh secara hukum.</span>
          </label>
        </div>
      </div>

      <div class="protocol-footer">
        <button class="btn-cancel-proto" onclick="batalProtokol()">Batal</button>
        <button class="btn-proceed-proto" id="btnProsedLanjut" disabled onclick="eksekusiLanjutGoogleForm()">
          Lanjutkan Ke Form <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(protoWrapper);

  const loadingOverlay = document.getElementById("loadingOverlayKrs");
  const iconWrapper = document.getElementById("iconWrapperKrs");
  const statusText = document.getElementById("textStatusKrs");
  const subText = document.getElementById("textSubKrs");

  // Setup Event Listener Scroll untuk mendeteksi apakah teks sudah digulir ke bawah (baik manual atau via tombol)
  setTimeout(() => {
    const textContainer = document.getElementById("protocolTextContainer");
    if (textContainer) {
      textContainer.addEventListener("scroll", function() {
        const toleransi = 5;
        const posisiBawah = textContainer.scrollHeight - textContainer.scrollTop <= textContainer.clientHeight + toleransi;

        if (posisiBawah) {
          bukaKunciChecklist();
        }
      });
    }
  }, 300);

  // Step 1: Spinner berputar gembira selama 2.2 detik
  setTimeout(() => {
    if (iconWrapper && statusText && subText) {
      iconWrapper.classList.add("success");
      statusText.classList.remove("pulse");
      statusText.innerText = "Berhasil Terhubung Ke Server!";
      statusText.style.color = "#10b981";
      subText.innerText = "Membuka lembar protokol keamanan...";
    }

    // Step 2: Fade out overlay loading
    setTimeout(() => {
      if (loadingOverlay) {
        loadingOverlay.style.opacity = "0";
        loadingOverlay.style.transform = "scale(1.03)";
        setTimeout(() => {
          loadingOverlay.remove();
        }, 500);
      }
    }, 900);

  }, 2200);
}

function cekKlikCheckboxSebelumScroll(event) {
  const check1 = document.getElementById("checkPersetujuan1");
  if (check1 && check1.disabled) {
    event.preventDefault(); // Batalkan centang
    
    // Pertegas efek denyut (restart animasi) saat kotak centang ditekan tapi belum scroll
    const btnScroll = document.getElementById("btnQuickScroll");
    if (btnScroll && !btnScroll.classList.contains("hidden")) {
      btnScroll.style.animation = "none";
      void btnScroll.offsetWidth; // Trigger reflow
      btnScroll.style.animation = "denyutTombolScroll 1.2s infinite ease-in-out";
    }
  }
}

function bukaKunciChecklist() {
  const check1 = document.getElementById("checkPersetujuan1");
  const check2 = document.getElementById("checkPersetujuan2");
  const btnScroll = document.getElementById("btnQuickScroll");

  if (check1 && check1.disabled) {
    check1.disabled = false;
    if (check2) check2.disabled = false;

    if (btnScroll) {
      btnScroll.classList.add("hidden"); // Hilangkan tombol panah gulir bawah saat sudah sampai bawah
    }
  }
}

function gulirKeBawahProtokol() {
  const innerText = document.getElementById("protocolTextContainer");
  
  if (innerText) {
    innerText.scrollTo({ top: innerText.scrollHeight, behavior: "smooth" });
    setTimeout(bukaKunciChecklist, 400);
  }
}

function validasiChecklistProtokol() {
  const check1 = document.getElementById("checkPersetujuan1");
  const check2 = document.getElementById("checkPersetujuan2");
  const btnLanjut = document.getElementById("btnProsedLanjut");

  if (check1 && check2 && btnLanjut) {
    btnLanjut.disabled = !(check1.checked && check2.checked);
  }
}

function batalProtokol() {
  const protoWrapper = document.getElementById("modalProtokolLegal");
  if (protoWrapper) protoWrapper.remove();

  const modalBanner = document.getElementById("modalProgram17an");
  if (modalBanner) modalBanner.style.display = "flex";
}

function eksekusiLanjutGoogleForm() {
  const linkForm = window._linkTujuanFormSementara;
  
  if (linkForm) {
    window.open(linkForm, "_blank");
  }

  const protoWrapper = document.getElementById("modalProtokolLegal");
  if (protoWrapper) protoWrapper.remove();

  if (typeof window._callbackProtokolSelesai === "function") {
    window._callbackProtokolSelesai();
  }
}