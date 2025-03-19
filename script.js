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

    try {
        toggleLoading(true);
        
        // Создаем FormData для отправки
        const formData = new FormData();
        formData.append('entry.1045781291', name);
        formData.append('entry.1166974658', roomType);
        formData.append('entry.1166974658', phone);
        formData.append('entry.1166974658', checkIn);
        formData.append('entry.1166974658', checkOut);
        
        // Отправляем данные в Google Forms
        const response = await fetch('https://docs.google.com/forms/d/e/1FAIpQLScRMbsLMG-7qAjLh6dSXcjQyfBEv0srVcfO6yjrS-UqXRKc6Q/formResponse', {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error('Ошибка отправки формы');
        }
        
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
