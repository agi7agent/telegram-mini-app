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
    // Показываем главную страницу
    document.getElementById('mainPage').style.display = 'block';
    
    // Скрываем все остальные секции
    document.getElementById('bookingForm').classList.add('hidden');
    document.getElementById('aboutSection').classList.add('hidden');
    document.getElementById('contactsSection').classList.add('hidden');
}

// Функция возврата на главную страницу
function showMainPage() {
    document.getElementById('mainPage').style.display = 'block';
    document.getElementById('bookingForm').classList.add('hidden');
    document.getElementById('aboutSection').classList.add('hidden');
    document.getElementById('contactsSection').classList.add('hidden');
}

// Функции управления видимостью секций
function toggleBookingForm() {
    const form = document.getElementById('bookingForm');
    const mainPage = document.getElementById('mainPage');
    const isFormVisible = !form.classList.contains('hidden');
    
    // Если форма уже видна, скрываем её и показываем главную страницу
    if (isFormVisible) {
        form.classList.add('hidden');
        mainPage.style.display = 'block';
        return;
    }
    
    // Если форма скрыта, показываем её и скрываем главную страницу
    form.classList.remove('hidden');
    mainPage.style.display = 'none';
    document.getElementById('aboutSection').classList.add('hidden');
    document.getElementById('contactsSection').classList.add('hidden');
}

function showAbout() {
    const mainPage = document.getElementById('mainPage');
    const aboutSection = document.getElementById('aboutSection');
    
    mainPage.style.display = 'none';
    aboutSection.classList.remove('hidden');
    document.getElementById('bookingForm').classList.add('hidden');
    document.getElementById('contactsSection').classList.add('hidden');
}

function showContacts() {
    const mainPage = document.getElementById('mainPage');
    const contactsSection = document.getElementById('contactsSection');
    
    mainPage.style.display = 'none';
    contactsSection.classList.remove('hidden');
    document.getElementById('bookingForm').classList.add('hidden');
    document.getElementById('aboutSection').classList.add('hidden');
}

async function submitBooking() {
    try {
        // Получаем данные формы
        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            checkIn: document.getElementById('checkIn').value,
            checkOut: document.getElementById('checkOut').value,
            roomType: document.getElementById('roomType').value
        };

        // Проверяем заполнение обязательных полей
        if (!formData.name || !formData.phone || !formData.checkIn || !formData.checkOut || !formData.roomType) {
            alert('Пожалуйста, заполните все поля');
            return;
        }

        // Отправка данных в Google Sheets через Apps Script
        const response = await fetch('
https://script.google.com/macros/s/AKfycby9m2pfrLmGf7S1BRA3lv1aKptSQCFouFX8VK-35FwzC9_coTiG1E80VdmScNxx7m3g/exec', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(formData).toString()
        });

        // Очищаем форму
        document.getElementById('name').value = '';
        document.getElementById('phone').value = '';
        document.getElementById('checkIn').value = '';
        document.getElementById('checkOut').value = '';
        document.getElementById('roomType').value = '';

        // Показываем сообщение об успехе
        alert('Ваша заявка успешно отправлена!');
        
        // Возвращаемся на главную страницу
        showMainPage();

    } catch (error) {
        console.error('Ошибка:', error);
        alert('Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже.');
    }
}

// ... rest of the JavaScript stays the same ...
