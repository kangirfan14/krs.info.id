function renderBerandaAgendas() {
    const container = document.getElementById('agendaBerandaContainer');
    if (!container || typeof DATABASE_AGENDA === 'undefined') return;

    const now = new Date();
    const months = ["MEI", "MEI", "MAR", "APR", "MEI", "JUN", "JUL", "AGU", "SEP", "OKT", "NOV", "DES"]; 
    // Catatan: sesuaikan nama array bulan di atas dengan kebutuhan ejaan Anda.

    container.innerHTML = '';

    // Mengambil maksimal 5 agenda teratas dari pusat data agenda-data.js
    const listAgenda = DATABASE_AGENDA.slice(0, 5);

    listAgenda.forEach(item => {
        const startTime = new Date(item.start.replace(' ', 'T'));
        const endTime = new Date(item.end.replace(' ', 'T'));
        
        let statusText = "MENDATANG";
        let statusClass = "status-label mendatang";

        if (now >= startTime && now <= endTime) {
            statusText = "SEDANG BERLANGSUNG";
            statusClass = "status-label berlangsung pulse";
        } else if (now > endTime) {
            statusText = "SELESAI";
            statusClass = "status-label selesai";
        }

        // Ekstraksi rincian tanggal, bulan, dan tahun acara
        const day = String(startTime.getDate()).padStart(2, '0');
        const month = months[startTime.getMonth()];
        const year = startTime.getFullYear();
        const jam = item.start.split(' ')[1] ? item.start.split(' ')[1] + ' WIB' : '';

        const cardHtml = `
            <div class="agenda-card-modern">
              <div class="news-image-box">
                <img src="${item.banner || 'default-banner.jpg'}" alt="${item.title}">
              </div>
              <div class="agenda-date-badge">
                <div class="day">${day}</div>
                <div class="separator"></div>
                <div class="month">${month}</div>
                <div class="separator" class="mobile-hide"></div>
                <div class="year">${year}</div>
              </div>
              <div class="agenda-info">
                <div>
                  <span class="${statusClass}">${statusText}</span>
                </div>
                <h3 class="agenda-title">${item.title}</h3>
                <div class="agenda-meta-info">
                  <span><i class="fa-solid fa-clock"></i> ${jam}</span>
                  <span><i class="fa-solid fa-location-dot"></i> ${item.location}</span>
                </div>
                <p class="agenda-short-desc">${item.desc}</p>
              </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', cardHtml);
    });
}

document.addEventListener('DOMContentLoaded', renderBerandaAgendas);