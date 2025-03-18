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
document.addEventListener('DOMContentLoaded', () => {
    // ... ваш код с именем пользователя ...

    // Скрываем все секции при загрузке
    document.getElementById('bookingForm').classList.add('hidden');
    document.getElementById('aboutSection').classList.add('hidden');
    document.getElementById('contactsSection').classList.add('hidden');
});

// Функция для переключения формы бронирования
function toggleBookingForm() {
    const form = document.getElementById('bookingForm');
    form.classList.toggle('hidden'); // Переключаем видимость
    
    // Скрываем другие секции
    document.getElementById('aboutSection').classList.add('hidden');
    document.getElementById('contactsSection').classList.add('hidden');
}
