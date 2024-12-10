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





























const telegram = window.Telegram.WebApp;
const USER_ID = telegram.initDataUnsafe.user ? telegram.initDataUnsafe.user.id : null;
const IS_PREMIUM = telegram.initDataUnsafe.user ? telegram.initDataUnsafe.user.is_premium || false : false;
const DEVICE_TYPE = telegram.platform;

telegram.expand();

if (telegram.isVersionAtLeast("6.1")){
  telegram.BackButton.hide();
};

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


// console.log('initDataUnsafe.user', telegram.initDataUnsafe.user);
// console.log('User ID:', USER_ID);
// console.log('Premium:', IS_PREMIUM);
// console.log('Device Type:', DEVICE_TYPE);






function hapticFeedback(type, redirectUrl = undefined, element = undefined) {
  if (telegram.isVersionAtLeast("6.1") && (DEVICE_TYPE === 'android' || DEVICE_TYPE === 'ios')) {
    switch (type) {
      case 'light':
        telegram.HapticFeedback.impactOccurred('light');
        break;
      case 'medium':
        telegram.HapticFeedback.impactOccurred('medium');
        break;
      case 'heavy':
        telegram.HapticFeedback.impactOccurred('heavy');
        break;
      case 'rigid':
        telegram.HapticFeedback.impactOccurred('rigid');
        break;
      case 'soft':
        telegram.HapticFeedback.impactOccurred('soft');
        break;
      case 'error':
        telegram.HapticFeedback.notificationOccurred('error');
        break;
      case 'success':
        telegram.HapticFeedback.notificationOccurred('success');
        break;
      case 'warning':
        telegram.HapticFeedback.notificationOccurred('warning');
        break;
      case 'change':
        telegram.HapticFeedback.selectionChanged();
        break;
      default:
        console.warn('Unknown haptic feedback type:', type);
    }
  } else {
    console.error('Haptic feedback is not supported in this environment.');
  }

  if (element) {
    if (element.classList.contains('visible')) {
      element.classList.remove('visible');
    } else {
      element.classList.add('zoom-out');
    }
  }

  if (redirectUrl && redirectUrl !== '#') {
    const children = document.querySelectorAll('.content > *');
    children.forEach((child, index) => {
      setTimeout(() => {
        child.classList.remove('visible');
        child.classList.add('hidden');
      }, index * 25);
    });

    setTimeout(() => {
      window.location.href = redirectUrl;
    }, children.length * 25);
  }
  
}







const container = document.querySelector('.user-image-container');
const rootPath = window.location.origin;
const imageFolder = `${rootPath}/shobla_ebla/img-circular-animation`;
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




