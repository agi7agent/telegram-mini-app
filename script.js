document.addEventListener('DOMContentLoaded', () => {
    try {
        const tg = window.Telegram.WebApp;
        tg.ready();
        tg.expand();

        // Показываем имя пользователя
        const user = tg.initDataUnsafe?.user || {};
        document.getElementById('username').textContent = 
            user.first_name || user.username || 'Гость';

        // Устанавливаем минимальные даты для бронирования
        const today = new Date().toISOString().split('T')[0];
        document.querySelectorAll('input[type="date"]').forEach(input => {
            input.min = today;
        });

        initializePageState();
    } catch (error) {
        console.error('Ошибка инициализации:', error);
        alert('Ошибка загрузки приложения');
    }
});

// Универсальная функция управления отображением секций
function showSection(sectionId) {
    const sections = ['mainPage', 'bookingForm', 'aboutSection', 'contactsSection'];
    sections.forEach(id => {
        const element = document.getElementById(id);
        element.style.display = id === sectionId ? 'block' : 'none';
    });
}

function initializePageState() {
    showSection('mainPage');
}

// Унифицированный обработчик для кнопок
function handleButtonClick(action) {
    switch(action) {
        case 'booking':
            showSection('bookingForm');
            break;
        case 'about':
            showSection('aboutSection');
            break;
        case 'contacts':
            showSection('contactsSection');
            break;
        default:
            showSection('mainPage');
    }
}

async function submitBooking() {
    try {
        // Проверка заполнения полей
        const formData = {
            name: document.getElementById('name').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            checkIn: document.getElementById('checkIn').value,
            checkOut: document.getElementById('checkOut').value,
            roomType: document.getElementById('roomType').value
        };

        if (!formData.name || !formData.phone || !formData.checkIn || !formData.checkOut) {
            alert('Пожалуйста, заполните все обязательные поля');
            return;
        }

        // Отправка данных (ваш URL скрипта)
        const response = await fetch('ВАШ_URL_СКРИПТА', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(formData).toString()
        });

        // Очистка формы
        document.getElementById('bookingForm').reset();
        alert('Бронирование успешно отправлено!');
        showSection('mainPage');

    } catch (error) {
        console.error('Ошибка:', error);
        alert('Ошибка при отправке. Попробуйте ещё раз.');
    }
}
