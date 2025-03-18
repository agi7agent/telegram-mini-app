const tg = window.Telegram.WebApp;

document.addEventListener('DOMContentLoaded', () => {
    if (!tg.initDataUnsafe) {
        console.error("Ошибка: initDataUnsafe не доступен.");
        return;
    }

    // Извлечение данных пользователя
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
    document.getElementById('bookingForm').style.display = 'none';
}

// Функция для открытия формы бронирования
function toggleBookingForm() {
    const form = document.getElementById('bookingForm');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
    document.getElementById('aboutSection').style.display = 'none';
    document.getElementById('contactsSection').style.display = 'none';
}

// Функция для показа контактов
function showContacts() {
    document.getElementById('contactsSection').style.display = 'block';
    document.getElementById('aboutSection').style.display = 'none';
    document.getElementById('bookingForm').style.display = 'none';
}

// Функция отправки данных бронирования
async function submitBooking() {
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();

    if (!name || !phone) {
        alert('Пожалуйста, заполните все поля.');
        return;
    }

    try {
        const response = await fetch('https://script.google.com/macros/s/ВАШ_ID/exec', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, phone })
        });

        if (response.ok) {
            alert('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
            document.getElementById('name').value = '';
            document.getElementById('phone').value = '';
            toggleBookingForm();
        } else {
            alert('Ошибка при отправке заявки.');
        }
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Произошла ошибка. Попробуйте позже.');
    }
}
