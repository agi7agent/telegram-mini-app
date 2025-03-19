document.addEventListener('DOMContentLoaded', () => {
    try {
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

        // Установка минимальной даты (если такие поля есть в HTML)
        const today = new Date().toISOString().split('T')[0];
        const checkInField = document.getElementById('checkIn');
        const checkOutField = document.getElementById('checkOut');
        if (checkInField) checkInField.min = today;
        if (checkOutField) checkOutField.min = today;

        // Инициализация состояний
        initializePageState();
    } catch (error) {
        console.error('Ошибка инициализации:', error);
    }
});

// Функция инициализации состояний
function initializePageState() {
    const mainPage = document.getElementById('mainPage');
    const bookingForm = document.getElementById('bookingForm');
    const aboutSection = document.getElementById('aboutSection');
    const contactsSection = document.getElementById('contactsSection');

    // Проверяем существование элементов
    if (mainPage && bookingForm && aboutSection && contactsSection) {
        mainPage.classList.remove('hidden'); // Используем CSS-класс
        bookingForm.classList.add('hidden');
        aboutSection.classList.add('hidden');
        contactsSection.classList.add('hidden');
    }
}

// Функции управления видимостью
function toggleBookingForm() {
    const mainPage = document.getElementById('mainPage');
    const bookingForm = document.getElementById('bookingForm');
    
    if (!mainPage || !bookingForm) return;

    const isFormVisible = bookingForm.classList.toggle('hidden');
    mainPage.classList.toggle('hidden', isFormVisible);
}

function showAbout() {
    const mainPage = document.getElementById('mainPage');
    const aboutSection = document.getElementById('aboutSection');
    
    if (mainPage && aboutSection) {
        mainPage.classList.add('hidden');
        aboutSection.classList.remove('hidden');
    }
}

function showContacts() {
    const mainPage = document.getElementById('mainPage');
    const contactsSection = document.getElementById('contactsSection');
    
    if (mainPage && contactsSection) {
        mainPage.classList.add('hidden');
        contactsSection.classList.remove('hidden');
    }
}
