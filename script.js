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
    } catch (error) {
        console.error('Ошибка инициализации Telegram Web App:', error);
    }

    // Скрытие всех секций при загрузке
    document.getElementById('bookingForm').classList.add('hidden');
    document.getElementById('aboutSection').classList.add('hidden');
    document.getElementById('contactsSection').classList.add('hidden');
});

// ... existing code ...

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

// Функция для отправки данных в Google Forms
async function submitToGoogleForm(formData) {
    // Замените URL на ваш Google Form URL
    const formUrl = 'YOUR_GOOGLE_FORM_URL';
    
    try {
        const response = await fetch(formUrl, {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error('Ошибка отправки формы');
        }
        
        return true;
    } catch (error) {
        console.error('Ошибка при отправке в Google Forms:', error);
        return false;
    }
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
        
        // Создаем FormData для отправки
        const formData = new FormData();
        formData.append('entry.1234567890', name); // Замените на реальные ID полей Google Form
        formData.append('entry.1234567891', phone);
        formData.append('entry.1234567892', checkIn);
        formData.append('entry.1234567893', checkOut);
        formData.append('entry.1234567894', roomType);
        
        // Отправляем данные в Google Forms
        const success = await submitToGoogleForm(formData);
        
        if (success) {
            // Очистка формы
            document.getElementById('name').value = '';
            document.getElementById('phone').value = '';
            document.getElementById('checkIn').value = '';
            document.getElementById('checkOut').value = '';
            document.getElementById('roomType').value = '';
            
            // Скрытие формы
            document.getElementById('bookingForm').classList.add('hidden');
            
            // Показываем сообщение об успехе
            alert('Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.');
        } else {
            throw new Error('Ошибка отправки формы');
        }
    } catch (error) {
        console.error('Ошибка при отправке формы:', error);
        alert('Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже.');
    } finally {
        toggleLoading(false);
    }
}
