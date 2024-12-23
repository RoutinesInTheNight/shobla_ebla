// Просто появление контента
window.addEventListener('DOMContentLoaded', () => {
  const children = document.querySelectorAll('.content > *');
  children.forEach((child, index) => {
    setTimeout(() => {
      child.classList.add('visible');
    }, index * 25);
  });
});







const telegram = window.Telegram.WebApp;
const USER_ID = telegram.initDataUnsafe.user ? telegram.initDataUnsafe.user.id : null;
const IS_PREMIUM = telegram.initDataUnsafe.user ? telegram.initDataUnsafe.user.is_premium || false : false;
const DEVICE_TYPE = telegram.platform;

telegram.expand();

telegram.BackButton.show()
telegram.BackButton.onClick(() => hapticFeedback('soft', '../../home.html?centerElementId=darts'));

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








// Нижний паддинг в нижнем меню с учётом безопасной зоны
document.addEventListener('DOMContentLoaded', () => {
  const bottomMenu = document.querySelector('.bottom-menu');
  const menuImage = document.querySelector('.bottom-menu .menu img');
  let safeAreaBottom = 0;
  let contentSafeAreaBottom = 0;
  bottomMenu.style.paddingBottom = '0px';
  function updatePadding() {
    const totalPadding = safeAreaBottom + contentSafeAreaBottom;
    bottomMenu.style.paddingBottom = `${totalPadding}px`;
    if (menuImage) {
      const menuImageMarginTop = parseFloat(getComputedStyle(menuImage).marginTop) || 0;
      const currentPadding = parseFloat(getComputedStyle(bottomMenu).paddingBottom) || 0;
      if (currentPadding < menuImageMarginTop) {
        bottomMenu.style.paddingBottom = `${menuImageMarginTop}px`;
      }
    }
  }
  function onContentSafeAreaChanged() {
    const contentSafeArea = telegram.contentSafeAreaInset || {};
    contentSafeAreaBottom = contentSafeArea.bottom || 0;
    updatePadding();
  }
  function onSafeAreaChanged() {
    const safeArea = telegram.safeAreaInset || {};
    safeAreaBottom = safeArea.bottom || 0;
    updatePadding();
  }
  telegram.onEvent('contentSafeAreaChanged', onContentSafeAreaChanged);
  telegram.onEvent('safeAreaChanged', onSafeAreaChanged);
  onContentSafeAreaChanged();
  onSafeAreaChanged();
});














function hapticFeedback(type, redirectUrl) {
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











document.addEventListener('DOMContentLoaded', () => {
  const choiceBet = document.querySelector('.choice-bet');
  const bets = document.querySelectorAll('.bet');

  let currentBetValue = localStorage.getItem('current_bet') || '100';

  const highlightBet = (betElement) => {
    bets.forEach(bet => bet.classList.remove('selected'));
    betElement.classList.add('selected');
    currentBetValue = betElement.dataset.bet;
    localStorage.setItem('current_bet', currentBetValue);
  };

  const getCenterBet = () => {
    const center = choiceBet.scrollLeft + choiceBet.clientWidth / 2;

    // Находим ближайший элемент к центру
    return Array.from(bets).reduce((closest, bet) => {
      const betCenter = bet.offsetLeft + bet.offsetWidth / 2;
      const distance = Math.abs(center - betCenter);
      return distance < closest.distance ? { bet, distance } : closest;
    }, { bet: null, distance: Infinity }).bet;
  };

  // Центрируем изначально выбранный элемент
  const initialBetElement = Array.from(bets).find(bet => bet.dataset.bet === currentBetValue);
  if (initialBetElement) {
    choiceBet.scrollTo({
      left: initialBetElement.offsetLeft - choiceBet.offsetWidth / 2 + initialBetElement.offsetWidth / 2,
      behavior: 'auto',
    });
    highlightBet(initialBetElement);
  }

  let lastBet = null;

  choiceBet.addEventListener('scroll', () => {
    // Находим ближайший к центру элемент
    const centerBet = getCenterBet();

    // Если элемент изменился, обновляем класс и выводим в консоль
    if (centerBet && centerBet !== lastBet) {
      highlightBet(centerBet);
      hapticFeedback('change');
      console.log(`Текущая ставка: ${centerBet.dataset.bet}`);
      lastBet = centerBet;
    }
  });

  // Добавляем выбор по клику
  bets.forEach(bet => {
    bet.addEventListener('click', () => {
      const offset = bet.offsetLeft - choiceBet.offsetWidth / 2 + bet.offsetWidth / 2;
      choiceBet.scrollTo({
        left: offset,
        behavior: 'smooth',
      });
      highlightBet(bet);
    });
  });

  // Предотвращаем автоматический фокус
  document.body.scrollTo(0, 0);
});























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
  hapticFeedback('soft')
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
