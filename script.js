document.addEventListener('DOMContentLoaded', () => {
    // Инициализация Telegram Web App
    const tg = window.Telegram.WebApp;
    tg.ready();
    tg.expand();

    // Установка имени пользователя
    let displayName = 'Гость';
    if (tg.initDataUnsafe?.user) {
        const user = tg.initDataUnsafe.user;
        displayName = user.first_name || user.username || 'Гость';
    }
    document.getElementById('username').textContent = displayName;

    // Скрытие всех секций при загрузке
    document.getElementById('bookingForm').classList.add('hidden');
    document.getElementById('aboutSection').classList.add('hidden');
    document.getElementById('contactsSection').classList.add('hidden');
});

// Функции управления видимостью секций
function toggleBookingForm() {
    const form = document.getElementById('bookingForm');
    form.classList.toggle('hidden');
    
    // Гарантированное скрытие других секций
    document.getElementById('aboutSection').classList.add('hidden');
    document.getElementById('contactsSection').classList.add('hidden');
}

function showAbout() {
    document.getElementById('aboutSection').classList.remove('hidden');
    document.getElementById('bookingForm').classList.add('hidden');
    document.getElementById('contactsSection').classList.add('hidden');
}

function showContacts() {
    document.getElementById('contactsSection').classList.remove('hidden');
    document.getElementById('bookingForm').classList.add('hidden');
    document.getElementById('aboutSection').classList.add('hidden');
}
