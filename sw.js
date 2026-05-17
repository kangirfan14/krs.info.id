// Di dalam sw.js
self.addEventListener('message', (event) => {
    const { title, body, delay, banner, type } = event.data;
    if (delay > 0) {
        setTimeout(() => {
            self.registration.showNotification(title, {
                body: body,
                icon: 'logo-krs.png',
                image: banner, // <--- Ini yang nampilin foto besar
                vibrate: [500, 110, 500],
                requireInteraction: (type === 'sekarang')
            });
        }, delay);
    }
});