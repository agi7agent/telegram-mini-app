document.addEventListener('DOMContentLoaded', () => {
    try {
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

        // Установка минимальной даты для полей дат
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('checkIn').min = today;
        document.getElementById('checkOut').min = today;

        // Инициализация начального состояния
        initializePageState();
    } catch (error) {
        console.error('Ошибка инициализации Telegram Web App:', error);
    }
});

// Функция инициализации состояния страницы
function initializePageState() {
    // Скрываем все секции кроме главной
    document.getElementById('bookingForm').classList.add('hidden');
    document.getElementById('aboutSection').classList.add('hidden');
    document.getElementById('contactsSection').classList.add('hidden');
}

// Функции управления видимостью секций
function toggleBookingForm() {
    const form = document.getElementById('bookingForm');
    const isFormVisible = !form.classList.contains('hidden');
    
    // Если форма уже видна, скрываем её
    if (isFormVisible) {
        form.classList.add('hidden');
        return;
    }
    
    // Если форма скрыта, показываем её и скрываем другие секции
    form.classList.remove('hidden');
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

// Функция для показа/скрытия индикатора загрузки
function toggleLoading(show) {
    const submitButton = document.querySelector('.booking-form .tg-button');
    if (show) {
        submitButton.disabled = true;
        submitButton.innerHTML = 'Отправка...';
    } else {
        submitButton.disabled = false;
        submitButton.innerHTML = 'Отправить заявку';
    }
}

// Функция для валидации дат
function validateDates() {
    const checkIn = new Date(document.getElementById('checkIn').value);
    const checkOut = new Date(document.getElementById('checkOut').value);
    
    if (checkOut <= checkIn) {
        alert('Дата выезда должна быть позже даты заезда');
        return false;
    }
    return true;
}

async function submitBooking() {
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const checkIn = document.getElementById('checkIn').value;
    const checkOut = document.getElementById('checkOut').value;
    const roomType = document.getElementById('roomType').value;
    
    // Валидация формы
    if (!name || !phone || !checkIn || !checkOut || !roomType) {
        alert('Пожалуйста, заполните все поля');
        return;
    }

    if (!document.getElementById('phone').checkValidity()) {
        alert('Пожалуйста, введите корректный номер телефона');
        return;
    }

    if (!validateDates()) {
        return;
    }

    try {
        toggleLoading(true);
        
        // Здесь будет отправка данных в Google Forms
        // Временная имитация для демонстрации
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Очистка формы
        document.getElementById('name').value = '';
        document.getElementById('phone').value = '';
        document.getElementById('checkIn').value = '';
        document.getElementById('checkOut').value = '';
        document.getElementById('roomType').value = '';
        
        // Скрытие формы
        document.getElementById('bookingForm').classList.add('hidden');
        
        alert('Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.');
    } catch (error) {
        console.error('Ошибка при отправке формы:', error);
        alert('Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже.');
    } finally {
        toggleLoading(false);
    }
}
