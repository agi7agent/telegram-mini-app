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
// Добавьте этот код в script.js
let currentDate = new Date();
let selectedDateField = null;

function showCalendar(fieldId) {
    selectedDateField = fieldId;
    renderCalendar(currentDate);
    document.getElementById('calendarPopup').classList.remove('hidden');
}

function hideCalendar() {
    document.getElementById('calendarPopup').classList.add('hidden');
}

function renderCalendar(date) {
    const monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
        "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
    ];

    document.getElementById('currentMonth').textContent = 
        `${monthNames[date.getMonth()]} ${date.getFullYear()}`;

    const calendarDays = document.getElementById('calendarDays');
    calendarDays.innerHTML = '';

    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    
    // Пустые ячейки для дней предыдущего месяца
    for (let i = 0; i < firstDay.getDay(); i++) {
        const div = document.createElement('div');
        div.classList.add('calendar-day');
        calendarDays.appendChild(div);
    }

    // Дни текущего месяца
    for (let day = 1; day <= lastDay.getDate(); day++) {
        const div = document.createElement('div');
        div.classList.add('calendar-day');
        div.textContent = day;
        div.onclick = () => selectDate(day);
        calendarDays.appendChild(div);
    }
}

function selectDate(day) {
    const selectedDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
    );
    
    const formattedDate = selectedDate.toISOString().split('T')[0];
    document.getElementById(selectedDateField).value = formattedDate;
    hideCalendar();
}

function changeMonth(offset) {
    currentDate.setMonth(currentDate.getMonth() + offset);
    renderCalendar(currentDate);
}

// Модифицируйте поля ввода дат в форме бронирования:
<div class="form-group">
    <label>Дата заезда:</label>
    <input type="text" id="checkIn" readonly onclick="showCalendar('checkIn')">
</div>
<div class="form-group">
    <label>Дата выезда:</label>
    <input type="text" id="checkOut" readonly onclick="showCalendar('checkOut')">
</div>
// ... rest of the JavaScript stays the same ...
