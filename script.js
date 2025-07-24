// Инициализация Telegram WebApp
const tg = window.Telegram.WebApp;

tg.expand();
// Показываем кнопку "Закрыть" в интерфейсе


// Получаем данные пользователя (если разрешено)
const user = tg.initDataUnsafe.user;
if (user) {
    console.log("Пользователь:", `${user.first_name} ${user.last_name || ''}`);
}

// Обработчик формы
document.getElementById('application-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        course: document.getElementById('course').value
    };

    // Отправляем данные в бота
    tg.sendData(JSON.stringify(formData));
    
    // Показываем уведомление
    const notification = document.getElementById('notification');
    notification.textContent = "Заявка отправлена! С вами свяжутся.";
    notification.style.display = "block";
    
    setTimeout(() => {
        notification.style.display = "none";
        tg.close(); // Закрываем приложение после отправки
    }, 3000);
});

// Выбор курса по клику на карточку
document.querySelectorAll('.course-card').forEach(card => {
    card.addEventListener('click', () => {
        document.getElementById('course').value = card.dataset.course;
    });
});