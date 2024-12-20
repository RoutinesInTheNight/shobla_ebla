// Появление всех элементов при загрузке страницы
window.addEventListener('DOMContentLoaded', () => {
  const children = document.querySelectorAll('.content > *');
  children.forEach((child, index) => {
    setTimeout(() => {
      child.classList.add('visible');
    }, index * 25); // Задержка для каждого дочернего элемента
  });
});



// Добавление анимированного кубка
var animation = bodymovin.loadAnimation({
  container: document.getElementById('animated-cup'),
  path: '../animations/cup.json',
  render: 'svg',
  loop: true,
  autoplay: false,
  name: 'demo anumation'
});


const telegram = window.Telegram.WebApp;

telegram.expand();

telegram.BackButton.show()
telegram.BackButton.onClick(() => hapticFeedback('soft', '../'));


if (telegram.isVersionAtLeast("7.7")) {
  telegram.disableVerticalSwipes();
};

if (telegram.isVersionAtLeast("8.0")) {
  try {
    telegram.requestFullscreen();
  } catch (e) {
  };
  telegram.lockOrientation();
};

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






























const animations = ['1.json', '2.json', '3.json', '4.json', '5.json', '6.json']; // Рандомные анимации
const initialAnimation = '7.json'; // Седьмая анимация
const container = document.getElementById('animation-container');
const throwButton = document.getElementById('throw-button');

let currentAnimation = null; // Текущая анимация
let isPlaying = false; // Флаг воспроизведения анимации
let initialMode = true; // Флаг начальной анимации

// Создаём контейнер для седьмой анимации
const initialContainer = document.createElement('div');
container.appendChild(initialContainer);

// Загружаем седьмую анимацию
const initialAnimationInstance = bodymovin.loadAnimation({
  container: initialContainer,
  path: `animations/${initialAnimation}`,
  renderer: 'svg',
  loop: true,
  autoplay: true,
  name: 'initial-animation',
});

// Загружаем рандомные анимации в массив
const animationInstances = animations.map((path, index) => {
  const animationContainer = document.createElement('div');
  animationContainer.style.display = 'none';
  container.appendChild(animationContainer);

  return bodymovin.loadAnimation({
    container: animationContainer,
    path: `animations/${path}`,
    renderer: 'svg',
    loop: false,
    autoplay: false,
    name: `animation-${index}`,
  });
});

// Функция для скрытия всех анимаций
function hideAllAnimations() {
  animationInstances.forEach(instance => {
    instance.wrapper.style.display = 'none';
  });
  initialContainer.style.display = 'none';
}

// Функция для отображения текущей анимации
function showCurrentAnimation(animation) {
  if (animation) {
    animation.wrapper.style.display = 'block';
  }
}

// Функция для остановки текущей анимации
function stopCurrentAnimation() {
  if (currentAnimation) {
    currentAnimation.stop();
    currentAnimation.goToAndStop(0, true);
  }
}

// Обработчик для кнопки "Бросок"
throwButton.addEventListener('click', () => {
  if (isPlaying) return; // Если анимация проигрывается, ничего не делаем

  if (initialMode) {
    // Если сейчас начальная анимация
    initialAnimationInstance.loop = false; // Останавливаем циклическое воспроизведение
    initialAnimationInstance.addEventListener('complete', () => {
      // Когда седьмая анимация завершает цикл
      initialMode = false; // Отключаем начальный режим
      hideAllAnimations(); // Скрываем седьмую анимацию
      playRandomAnimation(); // Запускаем случайную анимацию
    });
  } else {
    // Если уже не начальная анимация
    playRandomAnimation();
  }
});

// Функция для запуска случайной анимации
function playRandomAnimation() {
  stopCurrentAnimation();
  hideAllAnimations();
  currentAnimation = animationInstances[Math.floor(Math.random() * animationInstances.length)];
  showCurrentAnimation(currentAnimation);
  currentAnimation.play();

  // Устанавливаем флаг воспроизведения
  isPlaying = true;
  currentAnimation.addEventListener('complete', () => {
    isPlaying = false; // Сбрасываем флаг после завершения
  });
}

// Начальная инициализация: показываем только седьмую анимацию
hideAllAnimations();
initialContainer.style.display = 'block';
