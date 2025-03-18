document.addEventListener('DOMContentLoaded', () => {
    const tg = window.Telegram.WebApp;
    tg.ready();
    tg.expand(); // Раскрываем приложение на весь экран

    let displayName = 'Гость';
    
    // Получаем данные пользователя напрямую
    if (tg.initDataUnsafe?.user) {
        const user = tg.initDataUnsafe.user;
        displayName = user.first_name || user.username || 'Гость';
    }

    // Отображаем имя
    document.getElementById('username').textContent = displayName;
});
