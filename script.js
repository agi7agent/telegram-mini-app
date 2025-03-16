// Инициализация SDK
if (window.Telegram && window.Telegram.WebApp) {
    const WebApp = window.Telegram.WebApp;

    // Автоматическое раскрытие на весь экран
    WebApp.ready();
    WebApp.expand();

    // Использование данных пользователя из Telegram
    const user = WebApp.initDataUnsafe ? JSON.parse(WebApp.initDataUnsafe) : {};
    document.getElementById('username').textContent = user.first_name || 'Гость';

    // Настройка MainButton в нижней панели
    WebApp.MainButton.setText('Забронировать');
    WebApp.MainButton.show();
    WebApp.MainButton.onClick(() => openBookingForm());
}

// Обработчик клика на кнопку "Забронировать"
document.getElementById('bookButton').onclick = () => openBookingForm();

function openBookingForm() {
    const formData = {
        action: 'booking',
        date: new Date().toISOString()
    };
    WebApp.sendData(JSON.stringify(formData));
}

// Обработчик клика на кнопку "Контакты"
document.getElementById('contactsButton').onclick = () => showContacts();

function showContacts() {
    alert('Телефон для связи: +7 (999) 123-45-67');
}
