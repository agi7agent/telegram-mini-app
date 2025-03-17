const tg = window.Telegram.WebApp;

document.addEventListener('DOMContentLoaded', () => {
if (!tg.initDataUnsafe) {
console.error("Ошибка: initDataUnsafe не доступен.");
return;
}

const initData = new URLSearchParams(tg.initDataUnsafe);
const user = JSON.parse(initData.get('user'));
const displayName = user?.first_name || user?.username || 'Гость';

document.getElementById('username').textContent = displayName;
});

// Отображение имени пользователя
document.getElementById('username').textContent = displayName;

// Отправка имени пользователя в бота
tg.sendData(JSON.stringify({ userName: displayName }));
});

function doPost(e) {
// Обработка данных
return ContentService.createTextOutput("OK")
.setMimeType(ContentService.MimeType.TEXT);
}
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


