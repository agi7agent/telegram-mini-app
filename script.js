  // Инициализация Telegram Web App
const tg = window.Telegram.WebApp;

// Основные настройки приложения
function initApp() {
    tg.expand();
    tg.MainButton.setText("Мои бронирования").show();
    
    // Заполнение имени пользователя
    const usernameElement = document.getElementById('username');
    usernameElement.textContent = tg.initDataUnsafe.user?.first_name || 'Гость';
}

// Показ информации о санатории
function showAbout() {
    const aboutSection = document.getElementById('aboutSection');
    aboutSection.style.display = 'block';
    tg.viewportStableHeight = document.documentElement.scrollHeight;
}

// Открытие формы бронирования
function openBookingForm() {
    const bookingData = {
        action: 'new_booking',
        userId: tg.initDataUnsafe.user?.id,
        timestamp: new Date().toISOString()
    };
    
    tg.sendData(JSON.stringify(bookingData));
    tg.showPopup({
        title: 'Успешно!',
        message: 'Ваша заявка принята',
        buttons: [{ type: 'ok' }]
    });
}

// Показ контактной информации
function showContacts() {
    tg.showAlert('Контактная информация:\nТелефон: +7 977 880-08-02\nАдрес: ул. Курортная, 15');
}

// Обработчик изменения размера окна
window.addEventListener('resize', () => {
    tg.viewportStableHeight = window.innerHeight;
});

// Инициализация приложения после загрузки
document.addEventListener('DOMContentLoaded', initApp);
