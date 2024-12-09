function selectTab(tabId) {
  const gamesTab = document.getElementById('games');
  const achievementsTab = document.getElementById('achievements');
  const gamesContainer = document.getElementById('games-container');
  const achievementsContainer = document.getElementById('achievements-container');

//   if (tabId === 'games') {
//     gamesTab.classList.add('active');
//     achievementsTab.classList.remove('active');
//     gamesContainer.style.display = 'flex'; // Показываем контейнер игр
//     achievementsContainer.style.display = 'none'; // Полностью скрываем контейнер ачивок
//   } else if (tabId === 'achievements') {
//     achievementsTab.classList.add('active');
//     gamesTab.classList.remove('active');
//     achievementsContainer.style.display = 'flex'; // Показываем контейнер ачивок
//     gamesContainer.style.display = 'none'; // Полностью скрываем контейнер игр
//   }
// }

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
  const preloader = document.getElementById('preloader');
  const progress = document.getElementById('progress');

  // Функция для генерации случайных промежутков времени
  const getRandomIntervals = (totalDuration, steps) => {
    const intervals = [];
    let sum = 0;
    for (let i = 0; i < steps - 1; i++) {
      const remaining = totalDuration - sum;
      const interval = Math.random() * (remaining / (steps - i));
      intervals.push(interval);
      sum += interval;
    }
    intervals.push(totalDuration - sum);
    return intervals;
  };

  // Генерируем случайные промежутки для анимации
  const totalDuration = 1500; // 1 секунда
  const steps = 5;
  const intervals = getRandomIntervals(totalDuration, steps);

  // Анимируем полосу загрузки
  let accumulatedTime = 0;
  intervals.forEach((interval, index) => {
    setTimeout(() => {
      const progressPercentage = ((index + 1) / steps) * 100;
      progress.style.transitionDuration = `${interval}ms`;
      progress.style.width = `${progressPercentage}%`;
    }, accumulatedTime);
    accumulatedTime += interval;
  });

  // Убираем прелоадер после завершения анимации
  setTimeout(() => {
    preloader.classList.add('hidden');

    hapticFeedback('success');

    // Показываем контент после скрытия прелоадера
    setTimeout(() => {
      const children = document.querySelectorAll('.content > *');
      children.forEach((child, index) => {
        setTimeout(() => {
          child.classList.add('visible');
        }, index * 25);
      });
    }, 100); // Совпадает с длительностью transition в CSS
  }, totalDuration);
});















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
    // Начинаем скрывать элементы, перед тем как перейти на другой URL
    const children = document.querySelectorAll('.content > *');
    children.forEach((child, index) => {
      setTimeout(() => {
        child.classList.remove('visible');
        child.classList.add('hidden');
      }, index * 25); // Задержка для каждого дочернего элемента, чтобы они исчезали по очереди
    });

    // После того, как элементы исчезнут, переход на новый URL
    setTimeout(() => {
      window.location.href = redirectUrl;
    }, children.length * 25); // Ждем, пока все элементы исчезнут (умножаем на задержку)
  } else {
    console.error('Неверный путь!');
  }
}





// Анимация нажатия на аватарку
const image = document.querySelector('.user-image');
function animateImage() {
  hapticFeedback('light');
  image.classList.add('shrink');
  setTimeout(() => {
    image.classList.remove('shrink');
  }, 100);
}
image.addEventListener('click', animateImage);




const container = document.querySelector('.user-image-container');
const imageFolder = 'img-circular-animation'; // Папка с изображениями
const totalImages = 15; // Количество маленьких изображений
const interval = 100; // Интервал появления изображений (в миллисекундах)
const circleRadius = 75; // Радиус круга в vw

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

  // Генерируем рандомный конечный угол поворота
  const randomRotation = Math.floor(Math.random() * 360);

  // Устанавливаем начальные координаты как переменные CSS
  img.style.setProperty('--start-x', `${x}vw`);
  img.style.setProperty('--start-y', `${y}vw`);
  img.style.setProperty('--rotate-end', `${randomRotation}deg`);

  container.appendChild(img); // Добавляем изображение в контейнер

  // Запускаем анимацию с задержкой, чтобы гарантировать плавное появление
  setTimeout(() => {
      img.style.opacity = 1; // Начинаем анимацию появления
  }, 50); // Задержка в 50ms

  // Удаление изображения после завершения анимации
  img.addEventListener('animationend', () => {
      // Задержка перед удалением
      setTimeout(() => {
          img.remove();
      }, 1000); // 1000 миллисекунд = 1 секунда
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




