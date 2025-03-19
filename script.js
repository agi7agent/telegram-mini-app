document.addEventListener('DOMContentLoaded', () => {
    const tg = window.Telegram.WebApp;
    tg.ready();
    tg.expand(); // Раскрываем приложение на весь экран

    let displayName = 'Гость';
    
    // Получаем данные пользователя напрямую
    if (tg.initDataUnsafe?.user) {
        const user = tg.initDataUnsafe.user;
        displayName = user.first_name || user.username || 'Гость';
    }

    // Отображаем имя
    document.getElementById('username').textContent = displayName;
});

        
        

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

// ... rest of the JavaScript stays the same ...
