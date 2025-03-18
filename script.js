const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

document.addEventListener('DOMContentLoaded', () => {
    let displayName = 'Гость';
    
    if (tg.initDataUnsafe?.user) {
        const user = tg.initDataUnsafe.user;
        displayName = user.first_name || user.username || 'Гость';
    }

    document.getElementById('username').textContent = displayName;
    tg.sendData(JSON.stringify({ userName: displayName }));
});

// Остальные функции остаются без изменений
...
