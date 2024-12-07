const telegram = window.Telegram.WebApp;

telegram.expand();
telegram.ready()

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

function softHapticFeedback() {
  telegram.hapticFeedback.impactOccurred('soft');
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
