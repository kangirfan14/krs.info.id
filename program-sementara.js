// ==========================================
// KONTROL PROGRAM SEMENTARA (MODULAR & DINAMIS)
// ==========================================

const CONFIG_PROGRAM = {
  aktif: true, // Master Switch

  fiturBolaAktif: false, // set true/false (Bola floating)
  tombolDaftarAktif: false, // set true/false (Tombol aksi di banner)

  // --- OPSI PERSATUAN / HANDLER MODAL ---
  // Isikan nama fungsi global yang ada di file lain (misal: "bukaModalProtokol" atau "bukaModalSyaratV2")
  // Jika diisi null / "" (string kosong), maka tombol akan langsung membuka linkForm di tab baru.
  fungsiPersetujuanCustom: "bukaModalProtokol",

  gambarUrl: "BLOK.png",
  badge: "INFO",
  judul: "Punya Foto Lomba atau Upacara di Blok Kamu?",
  deskripsi:
    "Yuk bagikan info kegiatan kemerdekaan di blok kamu agar bisa ditampilkan di platform KRS.Info!",
  textTombol: "DAFTARKAN",
  linkForm: "https://forms.gle/bXN9p7AJfCNVsjgr8",

  gambarBolaUrl: "",
  teksBola: "Kirim Lomba & Upacara!",

  sessionKey: "banner_17an_dilihat",
};

function initProgramSementara() {
  if (!CONFIG_PROGRAM.aktif) return;

  const style = document.createElement("style");
  style.id = "styleProgramSementara";
  style.innerHTML = `
    .modal-17an-overlay {
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0, 0, 0, 0.75); backdrop-filter: blur(6px);
      display: flex; align-items: center; justify-content: center;
      z-index: 99999; padding: 16px; transition: opacity 0.4s ease;
    }
    .modal-17an-box {
      background: #ffffff; border-radius: 20px;
      max-width: 440px; width: 100%; overflow: hidden;
      box-shadow: 0 25px 50px -12px rgba(0,0,0,0.4);
      position: relative; text-align: center;
      transition: transform 0.4s ease, opacity 0.4s ease;
      animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), 
                 shakeUp 0.5s ease-in-out 0.4s 2;
    }
    .close-modal-btn {
      position: absolute; top: 10px; right: 12px;
      background: rgba(0, 0, 0, 0.5); color: #fff;
      border: none; width: 32px; height: 32px; border-radius: 50%;
      font-size: 1.2rem; cursor: pointer; display: flex;
      align-items: center; justify-content: center; z-index: 10;
      transition: background 0.2s, transform 0.2s;
    }
    .close-modal-btn:hover { background: #d32f2f; transform: scale(1.1); }
    .modal-17an-image-wrapper { width: 100%; height: 180px; overflow: hidden; }
    .modal-17an-image { width: 100%; height: 100%; object-fit: cover; }
    .modal-17an-body { padding: 20px 24px 24px 24px; }
    .badge-modal { background: #ffebee; color: #c62828; padding: 5px 14px; border-radius: 20px; font-size: 0.8rem; font-weight: 700; display: inline-block; margin-bottom: 10px; }
    .modal-17an-body h3 { color: #111827; margin: 0 0 8px 0; font-size: 1.25rem; font-weight: 700; }
    .modal-17an-body p { color: #4b5563; font-size: 0.9rem; margin: 0; }
    
    .btn-submit-modal {
      background: linear-gradient(135deg, #d32f2f 0%, #9a0007 100%);
      color: #ffffff !important; display: flex; align-items: center; justify-content: center;
      gap: 8px; width: 100%; padding: 12px 18px; border-radius: 12px;
      font-weight: 700; font-size: 0.95rem; text-decoration: none; margin-top: 18px;
      box-shadow: 0 4px 14px rgba(211, 47, 47, 0.35); cursor: pointer; border: none; transition: all 0.2s;
    }
    .btn-submit-modal:hover { transform: translateY(-2px); }

    .floating-flag-container {
      position: fixed; bottom: 30px; right: 25px;
      display: none; flex-direction: column; align-items: center;
      z-index: 99998; cursor: grab; touch-action: none;
      animation: ballPop 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .floating-flag-container:active { cursor: grabbing; }
    .floating-label {
      background: #111827; color: #fff; font-size: 0.75rem; font-weight: 600;
      padding: 4px 10px; border-radius: 12px; margin-bottom: 8px;
      white-space: nowrap; box-shadow: 0 4px 10px rgba(0,0,0,0.2);
      pointer-events: none; position: relative;
      animation: floatLabel 2s infinite ease-in-out;
    }
    .floating-label::after {
      content: ''; position: absolute; bottom: -4px; left: 50%; transform: translateX(-50%);
      border-width: 5px 5px 0; border-style: solid;
      border-color: #111827 transparent transparent transparent;
    }
    .floating-flag-ball {
      width: 65px; height: 65px; border-radius: 50%;
      background: linear-gradient(180deg, #d32f2f 50%, #ffffff 50%);
      border: 3px solid #ffffff; box-shadow: 0 8px 20px rgba(0,0,0,0.3);
      display: flex; align-items: center; justify-content: center;
      overflow: hidden; position: relative; transition: transform 0.2s;
      animation: floatAnim 3s infinite ease-in-out;
    }
    .floating-flag-ball.custom-img { background: #ffffff; }
    .floating-flag-ball img.ball-img { width: 100%; height: 100%; object-fit: cover; }
    .floating-flag-ball:hover { transform: scale(1.05); }
    .lightning-icon {
      color: #ffeb3b; font-size: 1.5rem;
      filter: drop-shadow(0 2px 4px rgba(0,0,0,0.4));
      animation: flashGlow 1.2s infinite alternate; pointer-events: none;
    }
    .floating-flag-ball::after {
      content: ''; position: absolute; top: -50%; left: -60%;
      width: 40%; height: 200%; background: rgba(255, 255, 255, 0.5);
      transform: rotate(30deg); animation: shinePass 2.5s infinite; pointer-events: none;
    }

    @keyframes popIn { 0% { transform: scale(0.7); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
    @keyframes shakeUp {
      0%, 100% { transform: translateX(0); }
      20% { transform: translateX(-6px) rotate(-1deg); }
      40% { transform: translateX(6px) rotate(1deg); }
      60% { transform: translateX(-4px) rotate(-0.5deg); }
      80% { transform: translateX(4px) rotate(0.5deg); }
    }
    @keyframes floatAnim { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
    @keyframes floatLabel { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
    @keyframes flashGlow { 0% { opacity: 0.6; transform: scale(0.9); } 100% { opacity: 1; transform: scale(1.15); filter: drop-shadow(0 0 8px #ffeb3b); } }
    @keyframes shinePass { 0% { left: -60%; } 20%, 100% { left: 140%; } }
    @keyframes ballPop { 0% { transform: scale(0) rotate(-180deg); opacity: 0; } 100% { transform: scale(1) rotate(0deg); opacity: 1; } }
  `;
  document.head.appendChild(style);

  const sudahPernahLihat = sessionStorage.getItem(CONFIG_PROGRAM.sessionKey);

  if (!sudahPernahLihat) {
    bukaModal17an();
  } else if (CONFIG_PROGRAM.fiturBolaAktif) {
    buatBolaBantuan();
    tampilkanBolaBantuan();
  }
}

function bukaModal17an() {
  if (document.getElementById("modalProgram17an")) return;

  const htmlTombol = CONFIG_PROGRAM.tombolDaftarAktif
    ? `
    <button onclick="panggilModalPersetujuan()" class="btn-submit-modal">
      <i class="fa-solid fa-paper-plane"></i> ${CONFIG_PROGRAM.textTombol}
    </button>
  `
    : "";

  const modalWrapper = document.createElement("div");
  modalWrapper.id = "modalProgram17an";
  modalWrapper.className = "modal-17an-overlay";
  modalWrapper.innerHTML = `
    <div class="modal-17an-box" id="modal17anBox">
      <button class="close-modal-btn" onclick="animasiTutupModal()">&times;</button>
      <div class="modal-17an-image-wrapper">
        <img src="${CONFIG_PROGRAM.gambarUrl}" alt="Program" class="modal-17an-image" />
      </div>
      <div class="modal-17an-body">
        <span class="badge-modal">${CONFIG_PROGRAM.badge}</span>
        <h3>${CONFIG_PROGRAM.judul}</h3>
        <p>${CONFIG_PROGRAM.deskripsi}</p>
        ${htmlTombol}
      </div>
    </div>
  `;
  document.body.appendChild(modalWrapper);
}

// FUNGSI PEMANGGIL DINAMIS (BISA DILINK KE FILE LAIN)
function panggilModalPersetujuan() {
  const modalBanner = document.getElementById("modalProgram17an");
  if (modalBanner) modalBanner.style.display = "none";

  const namaFungsi = CONFIG_PROGRAM.fungsiPersetujuanCustom;

  // Cek apakah nama fungsi diisi dan memang ada di scope global (window)
  if (namaFungsi && typeof window[namaFungsi] === "function") {
    window[namaFungsi](CONFIG_PROGRAM.linkForm, () => {
      animasiTutupModal();
    });
  } else {
    // Fallback jika fungsi tidak ditemukan / diset null: langsung buka link form
    if (namaFungsi) {
      console.warn(
        `Fungsi persetujuan '${namaFungsi}' tidak ditemukan. Membuka link secara langsung.`,
      );
    }
    window.open(CONFIG_PROGRAM.linkForm, "_blank");
    animasiTutupModal();
  }
}

function animasiTutupModal() {
  const modalWrapper = document.getElementById("modalProgram17an");
  const modalBox = document.getElementById("modal17anBox");
  if (!modalWrapper) return;

  if (modalBox) {
    modalBox.style.transform = "scale(0.5) translateY(100px)";
    modalWrapper.style.opacity = "0";
  }

  setTimeout(() => {
    modalWrapper.remove();
    sessionStorage.setItem(CONFIG_PROGRAM.sessionKey, "true");

    if (CONFIG_PROGRAM.fiturBolaAktif) {
      buatBolaBantuan();
      tampilkanBolaBantuan();
    }
  }, 350);
}

function buatBolaBantuan() {
  if (document.getElementById("floatingFlagContainer")) return;

  const container = document.createElement("div");
  container.id = "floatingFlagContainer";
  container.className = "floating-flag-container";

  let kontenBola = `<i class="fa-solid fa-bolt lightning-icon"></i>`;
  let classBola = "floating-flag-ball";

  if (
    CONFIG_PROGRAM.gambarBolaUrl &&
    CONFIG_PROGRAM.gambarBolaUrl.trim() !== ""
  ) {
    kontenBola = `<img src="${CONFIG_PROGRAM.gambarBolaUrl}" alt="Icon" class="ball-img" />`;
    classBola += " custom-img";
  }

  container.innerHTML = `
    <div class="floating-label">${CONFIG_PROGRAM.teksBola}</div>
    <div class="${classBola}">
      ${kontenBola}
    </div>
  `;
  document.body.appendChild(container);

  let isDragging = false,
    hasMoved = false;
  let startX, startY, initialLeft, initialTop;

  const startDrag = (e) => {
    isDragging = true;
    hasMoved = false;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    startX = clientX;
    startY = clientY;
    const rect = container.getBoundingClientRect();
    initialLeft = rect.left;
    initialTop = rect.top;
  };

  const doDrag = (e) => {
    if (!isDragging) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const deltaX = clientX - startX,
      deltaY = clientY - startY;

    if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
      hasMoved = true;
      container.style.bottom = "auto";
      container.style.right = "auto";
      container.style.left = `${initialLeft + deltaX}px`;
      container.style.top = `${initialTop + deltaY}px`;
    }
  };

  const stopDrag = () => {
    isDragging = false;
  };

  container.addEventListener("mousedown", startDrag);
  window.addEventListener("mousemove", doDrag);
  window.addEventListener("mouseup", stopDrag);
  container.addEventListener("touchstart", startDrag);
  window.addEventListener("touchmove", doDrag);
  window.addEventListener("touchend", stopDrag);

  container.addEventListener("click", () => {
    if (!hasMoved) {
      container.style.display = "none";
      bukaModal17an();
    }
  });
}

function tampilkanBolaBantuan() {
  const container = document.getElementById("floatingFlagContainer");
  if (container) {
    container.style.display = "flex";
    container.style.top = "auto";
    container.style.left = "auto";
    container.style.bottom = "30px";
    container.style.right = "25px";
  }
}

document.addEventListener("DOMContentLoaded", initProgramSementara);
