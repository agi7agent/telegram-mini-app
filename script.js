document.addEventListener('DOMContentLoaded', () => {
    // Инициализация Telegram WebApp
    const tg = window.Telegram.WebApp;

    // Получение данных пользователя
    const initData = new URLSearchParams(tg.initDataUnsafe);
    const user = JSON.parse(initData.get('user'));
    const displayName = user?.first_name || user?.username || 'Гость';

    // Отображение имени пользователя
    document.getElementById('username').textContent = displayName;

    // Отправка имени пользователя в бота
    tg.sendData(JSON.stringify({ userName: displayName }));
});

// Функция для показа информации о санатории
function showAbout() {
    document.getElementById('aboutSection').style.display = 'block';
    document.getElementById('contactsSection').style.display = 'none';
}

// Функция для открытия формы бронирования
function openBookingForm() {
    if (window.Telegram.WebApp) {
        window.Telegram.WebApp.openLink('https://forms.gle/example'); // Замените на вашу форму Google Forms
    }
}

// Функция для показа контактов
function showContacts() {
    document.getElementById('contactsSection').style.display = 'block';
    document.getElementById('aboutSection').style.display = 'none';
}
