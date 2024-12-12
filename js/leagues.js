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





























const animations = ['1.json', '2.json', '3.json', '4.json', '5.json', '6.json'];
const container = document.getElementById('animation-container');
const throwButton = document.getElementById('throw-button');
let currentAnimation = null; // Ссылка на текущую анимацию
let isPlaying = false; // Флаг, указывающий, воспроизводится ли анимация

// Загружаем анимации в массив, но они изначально скрыты
const animationInstances = animations.map((path, index) => {
  const animationContainer = document.createElement('div'); // Создаем отдельный контейнер для каждой анимации
  animationContainer.style.display = 'none'; // Скрываем контейнер
  container.appendChild(animationContainer); // Добавляем в общий контейнер

  return bodymovin.loadAnimation({
    container: animationContainer,
    path: `animations/${path}`,
    renderer: 'svg',
    loop: false,
    autoplay: false,
    name: `animation-${index}`
  });
});

// Функция для скрытия всех анимаций
function hideAllAnimations() {
  animationInstances.forEach(instance => {
    instance.wrapper.style.display = 'none'; // Скрываем контейнер анимации
  });
}

// Функция для отображения текущей анимации
function showCurrentAnimation(animation) {
  if (animation) {
    animation.wrapper.style.display = 'block'; // Показываем контейнер текущей анимации
  }
}

// Функция для остановки текущей анимации и возврата к первому кадру
function stopCurrentAnimation() {
  if (currentAnimation) {
    currentAnimation.stop();
    currentAnimation.goToAndStop(0, true);
  }
}

// Функция для запуска текущей анимации
function playCurrentAnimation() {
  if (currentAnimation) {
    isPlaying = true;
    currentAnimation.play();

    // После окончания анимации сбрасываем флаг
    currentAnimation.addEventListener('complete', () => {
      isPlaying = false;
    });
  }
}

// Обработчик для кнопки "Бросок"
throwButton.addEventListener('click', () => {
  if (isPlaying) return; // Если анимация воспроизводится, ничего не делаем

  // Останавливаем текущую анимацию
  stopCurrentAnimation();

  // Скрываем текущую анимацию
  hideAllAnimations();

  // Выбираем новую случайную анимацию
  currentAnimation = animationInstances[Math.floor(Math.random() * animationInstances.length)];

  // Показываем новую анимацию
  showCurrentAnimation(currentAnimation);

  // Запускаем новую анимацию
  playCurrentAnimation();
});

// Инициализация: выбираем случайную анимацию и показываем её
currentAnimation = animationInstances[Math.floor(Math.random() * animationInstances.length)];
hideAllAnimations();
showCurrentAnimation(currentAnimation);
stopCurrentAnimation();
