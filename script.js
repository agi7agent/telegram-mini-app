document.addEventListener('DOMContentLoaded', () => {  
  try {  
    const tg = window.Telegram.WebApp;  
    tg.ready();  
    tg.expand();  

    // Имя пользователя  
    const user = tg.initDataUnsafe?.user || {};  
    document.getElementById('username').textContent = user.first_name || 'Гость';  

    // Даты  
    const today = new Date().toISOString().split('T')[0];  
    document.getElementById('checkIn').min = today;  
    document.getElementById('checkOut').min = today;  

    showSection('mainPage'); // Показать главную страницу  

  } catch (error) {  
    alert('Ошибка загрузки!');  
  }  
});  

// Навигация  
function showSection(sectionId) {  
  ['mainPage', 'bookingForm'].forEach(id => {  
    document.getElementById(id).style.display = id === sectionId ? 'block' : 'none';  
  });  
}  

// Отправка данных  
async function submitBooking() {  
  const formData = {  
    name: document.getElementById('name').value.trim(),  
    phone: document.getElementById('phone').value.trim(),  
    checkIn: document.getElementById('checkIn').value,  
    checkOut: document.getElementById('checkOut').value  
  };  

  if (!formData.name || !formData.phone) {  
    alert('Заполните все поля!');  
    return;  
  }  

  try {  
    await fetch('ВАШ_СКРИПТ_GOOGLE', {  
      method: 'POST',  
      body: JSON.stringify(formData)  
    });  
    alert('Успешно!');  
    showSection('mainPage');  
  } catch (error) {  
    alert('Ошибка отправки!');  
  }  
}  
