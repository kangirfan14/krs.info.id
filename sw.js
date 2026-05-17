self.addEventListener('message', event => {
    const { title, body, delay, banner } = event.data;

    setTimeout(() => {
        self.registration.showNotification(title, {
            body: body,
            icon: 'logo-krs.png',
            image: banner,
            vibrate: [500, 100, 500],
            badge: 'logo-krs.png'
        });
    }, delay);
});

self.addEventListener('notificationclick', event => {
    event.notification.close();
    event.waitUntil(clients.openWindow('/'));
});
