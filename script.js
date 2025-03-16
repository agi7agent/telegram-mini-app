// Проверяем, что приложение запущено в Telegram
if (window.Telegram && window.Telegram.WebApp) {
  const { WebApp } = window.Telegram;

  // Инициализация SDK
  WebApp.ready();

  // Обработчик нажатия на кнопку
  document.getElementById('bookButton').addEventListener('click', () => {
      // Отправляем данные обратно в бот
      WebApp.sendData('Новая заявка на бронь');
  });
} else {
  console.log('Приложение запущено вне Telegram');
}