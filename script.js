// Функция для вывода текущего URL в консоль
function logCurrentURL() {
  console.log("Current URL:", window.location.href);
}

// Вызываем функцию при загрузке страницы
logCurrentURL();

// Отслеживаем изменения URL (например, при навигации через историю браузера)
window.addEventListener('popstate', logCurrentURL);

// Если на сайте используются ссылки с изменением hash (#), отлавливаем их
window.addEventListener('hashchange', logCurrentURL);

// Если используются программные изменения URL (например, через history.pushState)
(function() {
  const originalPushState = history.pushState;
  history.pushState = function(...args) {
      originalPushState.apply(history, args);
      logCurrentURL();
  };

  const originalReplaceState = history.replaceState;
  history.replaceState = function(...args) {
      originalReplaceState.apply(history, args);
      logCurrentURL();
  };
})();






function selectTab(tabId) {
  const gamesTab = document.getElementById('games');
  const achievementsTab = document.getElementById('achievements');
  const gamesContainer = document.getElementById('games-container');
  const achievementsContainer = document.getElementById('achievements-container');

  if (tabId === 'games') {
    gamesTab.classList.add('active');
    achievementsTab.classList.remove('active');
    gamesContainer.style.display = 'flex'; // Показываем контейнер игр
    achievementsContainer.style.display = 'none'; // Полностью скрываем контейнер ачивок
  } else if (tabId === 'achievements') {
    achievementsTab.classList.add('active');
    gamesTab.classList.remove('active');
    achievementsContainer.style.display = 'flex'; // Показываем контейнер ачивок
    gamesContainer.style.display = 'none'; // Полностью скрываем контейнер игр
  }
}

// Установка начального состояния
window.onload = () => {
  selectTab('games');
};



['games', 'achievements'].forEach(id => {
  document.getElementById(id).addEventListener('click', () => {
    selectTab(id);
    hapticFeedback('change');
  });
});













// Появление всех элементов при загрузке страницы
window.addEventListener('DOMContentLoaded', () => {
  // Показываем заставку 0.5 сек
  setTimeout(() => {
    // Убираем прелоадер с анимацией исчезновения
    const preloader = document.getElementById('preloader');
    preloader.classList.add('hidden');

    // Делаем задержку, чтобы плавный переход завершился
    setTimeout(() => {
      const children = document.querySelectorAll('.content > *');
      children.forEach((child, index) => {
        setTimeout(() => {
          child.classList.add('visible');
        }, index * 25); // Задержка для каждого дочернего элемента
      });
    }, 500); // Совпадает с длительностью transition в CSS
  }, 500); // Длительность показа заставки
});
// 500   0




const telegram = window.Telegram.WebApp;

telegram.expand();

telegram.BackButton.hide()

if (telegram.isVersionAtLeast("7.7")){
  telegram.disableVerticalSwipes();
};

if (telegram.isVersionAtLeast("8.0")) {
  try {
    telegram.requestFullscreen();
  } catch (e) {
  };
  telegram.lockOrientation();
};


// telegram.safeAreaInset = {
//   top: 0,
//   bottom: 0,
//   left: 0,
//   right: 0
// };

// telegram.ContentSafeAreaInset = {
//   top: 0,
//   bottom: 0,
//   left: 0,
//   right: 0
// };

// telegram.ready();



function showAlert(message) {
  telegram.showAlert(message);
}

function showConfirm(message) {
  telegram.showConfirm(message);
}

function showConfirm(message) {
  telegram.showConfirm(message);
}






function hapticFeedback(type, redirectUrl) {
  if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.HapticFeedback) {
    switch (type) {
      case 'light':
        window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
        break;
      case 'medium':
        window.Telegram.WebApp.HapticFeedback.impactOccurred('medium');
        break;
      case 'heavy':
        window.Telegram.WebApp.HapticFeedback.impactOccurred('heavy');
        break;
      case 'rigid':
        window.Telegram.WebApp.HapticFeedback.impactOccurred('rigid');
        break;
      case 'soft':
        window.Telegram.WebApp.HapticFeedback.impactOccurred('soft');
        break;
      case 'error':
        window.Telegram.WebApp.HapticFeedback.notificationOccurred('error');
        break;
      case 'success':
        window.Telegram.WebApp.HapticFeedback.notificationOccurred('success');
        break;
      case 'warning':
        window.Telegram.WebApp.HapticFeedback.notificationOccurred('warning');
        break;
      case 'change':
        window.Telegram.WebApp.HapticFeedback.selectionChanged();
        break;
      default:
        console.warn('Unknown haptic feedback type:', type);
    }
  } else {
    console.error('Haptic feedback is not supported in this environment.');
  }
  if (redirectUrl && redirectUrl !== '#') {
    window.location.href = redirectUrl;
  } else {
    console.error('Неверный путь!');
  }
}



function gameNotReadyPopup() {
  telegram.showPopup({
      title  : "Игра ещё не готова",
      message: "(Не ладно, нахуй)",
      buttons: [
          {type: "default", text: "Понял, иду нахуй"},
      ]
  });
}




const container = document.querySelector('.user-image-container');
const imageFolder = 'images'; // Папка с изображениями
const totalImages = 5; // Количество маленьких изображений
const interval = 100; // Интервал появления изображений (в миллисекундах)
const circleRadius = 45; // Радиус круга в vw

// Генерация случайных координат на окружности
function getRandomPosition(radius) {
    const angle = Math.random() * Math.PI * 2; // Случайный угол в радианах
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return { x, y };
}

// Создание анимации для одного изображения
function createMovingImage(index) {
  const img = document.createElement('img');
  img.src = `${imageFolder}/${index}.png`;
  img.classList.add('moving-image');

  // Сначала устанавливаем opacity: 0
  img.style.opacity = 0;

  // Получаем случайное положение на границе круга
  const { x, y } = getRandomPosition(circleRadius);

  // Устанавливаем начальные координаты как переменные CSS
  img.style.setProperty('--start-x', `${x}vw`);
  img.style.setProperty('--start-y', `${y}vw`);
  img.style.left = '50%';
  img.style.top = '50%';

  // Добавляем изображение в контейнер
  container.appendChild(img);

  // Запускаем анимацию с задержкой, чтобы гарантировать плавное появление
  setTimeout(() => {
      img.style.opacity = 1; // Начинаем анимацию появления
  }, 50); // Задержка в 50ms

  // Удаление изображения после завершения анимации
  img.addEventListener('animationend', () => {
      // Задержка перед удалением
      setTimeout(() => {
          img.remove();
      }, 5000); // 1000 миллисекунд = 1 секунда
  });
}


// Генерация нескольких изображений
function generateImages() {
    // const count = Math.floor(Math.random() * totalImages) + 1; // Случайное количество изображений (от 1 до 5)
    const count = 1
    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * totalImages) + 1;
        createMovingImage(randomIndex);
    }
}

// Циклическое создание изображений
setInterval(generateImages, interval);
