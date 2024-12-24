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













// ВИБРАЦИЯ И РЕДИРЕКТ
function hapticFeedback(type, redirectUrl) {
  if (telegram.isVersionAtLeast('6.1')) {
    if (['light', 'medium', 'heavy', 'rigid', 'soft'].includes(type)) {
      telegram.HapticFeedback.impactOccurred(type);
    } else if (['error', 'success', 'warning'].includes(type)) {
      telegram.HapticFeedback.notificationOccurred(type);
    } else if (type === 'change') {
      telegram.HapticFeedback.selectionChanged();
    }
  }
  if (redirectUrl) {
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










// ДОБАВЛЕНИЕ В HTML СУММ СТАВКИ
document.addEventListener('DOMContentLoaded', () => {
  const betsData = [
    { bet: 100, text: '100' },
    { bet: 200, text: '200' },
    { bet: 300, text: '300' },
    { bet: 400, text: '400' },
    { bet: 500, text: '500' },
    { bet: 600, text: '600' },
    { bet: 700, text: '700' },
    { bet: 800, text: '800' },
    { bet: 900, text: '900' },
    { bet: 1000, text: '1K' },
    { bet: 2000, text: '2K' },
    { bet: 3000, text: '3K' },
    { bet: 4000, text: '4K' },
    { bet: 5000, text: '5K' },
    { bet: 6000, text: '6K' },
    { bet: 7000, text: '7K' },
    { bet: 8000, text: '8K' },
    { bet: 9000, text: '9K' },
    { bet: 10000, text: '10K' },
    { bet: 20000, text: '20K' },
    { bet: 30000, text: '30K' },
    { bet: 40000, text: '40K' },
    { bet: 50000, text: '50K' },
    { bet: 60000, text: '60K' },
    { bet: 70000, text: '70K' },
    { bet: 80000, text: '80K' },
    { bet: 90000, text: '90K' },
    { bet: 100000, text: '100K' },
    { bet: 200000, text: '200K' },
    { bet: 300000, text: '300K' },
    { bet: 400000, text: '400K' },
    { bet: 500000, text: '500K' },
    { bet: 600000, text: '600K' },
    { bet: 700000, text: '700K' },
    { bet: 800000, text: '800K' },
    { bet: 900000, text: '900K' },
    { bet: 1000000, text: '1M' },
    { bet: 2000000, text: '2M' },
    { bet: 3000000, text: '3M' },
    { bet: 4000000, text: '4M' },
    { bet: 5000000, text: '5M' },
    { bet: 6000000, text: '6M' },
    { bet: 7000000, text: '7M' },
    { bet: 8000000, text: '8M' },
    { bet: 9000000, text: '9M' },
    { bet: 10000000, text: '10M' },
    { bet: 20000000, text: '20M' },
    { bet: 30000000, text: '30M' },
    { bet: 40000000, text: '40M' },
    { bet: 50000000, text: '50M' },
    { bet: 60000000, text: '60M' },
    { bet: 70000000, text: '70M' },
    { bet: 80000000, text: '80M' },
    { bet: 90000000, text: '90M' },
    { bet: 100000000, text: '100M' },
    { bet: 200000000, text: '200M' },
    { bet: 300000000, text: '300M' },
    { bet: 400000000, text: '400M' },
    { bet: 500000000, text: '500M' },
    { bet: 600000000, text: '600M' },
    { bet: 700000000, text: '700M' },
    { bet: 800000000, text: '800M' },
    { bet: 900000000, text: '900M' },
    { bet: 1000000000, text: '1B' },
  ];
  const choiceBetContainer = document.getElementById('choice-bet');
  betsData.forEach(item => {
    const betDiv = document.createElement('div');
    betDiv.classList.add('bet');
    betDiv.setAttribute('data-bet', item.bet);
    const img = document.createElement('img');
    img.src = '../../images/coin.png';
    const p = document.createElement('p');
    p.textContent = item.text;
    betDiv.appendChild(img);
    betDiv.appendChild(p);
    choiceBetContainer.appendChild(betDiv);
  });
});







async function getTGItem(key) {
  return new Promise(resolve => {
    telegram.CloudStorage.getItem(key, (_, res) => {
      resolve(res === "" ? null : res);
    });
  });
}



// Функция для форматирования чисел
const formatNumber = (num) => Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');





let currentBetValue = localStorage.getItem('current_bet') || '500';
let balance = 500000;
let piggyBank = 0;
let deposit = 0;



// СКРОЛЛ СУММ СТАВКИ И УПРАВЛЕНИЕ ТЕКУЩЕЙ СУММОЙ СТАВКИ
document.addEventListener('DOMContentLoaded', async () => {

  const choiceBet = document.querySelector('.choice-bet');
  const bets = document.querySelectorAll('.bet');

  if (telegram.isVersionAtLeast('6.9')) {
    balance = await getTGItem('balance');
    piggyBank = await getTGItem('darts_piggy_bank');
    deposit = await getTGItem('darts_deposit');
  } else {
    // window.location.href = '../../ban';
  }
  localStorage.setItem('balance', balance);
  localStorage.setItem('darts_piggy_bank', piggyBank);
  localStorage.setItem('darts_deposit', deposit);
  document.getElementById('balance').textContent = formatNumber(balance);
  document.getElementById('piggy-bank').textContent = formatNumber(piggyBank);
  document.getElementById('deposit').textContent = formatNumber(deposit);


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























const animations = [
  '../../../animations/darts-1.json',
  '../../../animations/darts-2.json',
  '../../../animations/darts-3.json',
  '../../../animations/darts-4.json',
  '../../../animations/darts-5.json',
  '../../../animations/darts-lose.json'
];
const initialAnimation = '../../../animations/darts-wait.json';
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
// Обработчик для кнопки "Бросок"
throwButton.addEventListener('click', () => {
  if (isPlaying) return; // Если анимация проигрывается, ничего не делаем


  hapticFeedback('soft');


  // Меняем цвет и уменьшаем кнопку
  throwButton.classList.add('active', 'shrink');

  // Увеличиваем кнопку обратно через 0.5 секунды
  setTimeout(() => {
    throwButton.classList.remove('shrink');
  }, 150);

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

  // Выбираем случайную анимацию
  const randomIndex = Math.floor(Math.random() * animationInstances.length);
  currentAnimation = animationInstances[randomIndex];

  // Показываем текущую анимацию
  showCurrentAnimation(currentAnimation);
  currentAnimation.play();

  currentBetValue = Number(currentBetValue)
  balance -= currentBetValue;
  deposit += currentBetValue;
  document.getElementById('balance').textContent = formatNumber(balance);
  document.getElementById('deposit').textContent = formatNumber(deposit);











  isPlaying = true;

  // Устанавливаем таймер на 1 секунду
  setTimeout(() => {
    hapticFeedback('heavy');
    throwButton.classList.remove('active');

    const selectedPath = animations[randomIndex];
    if (selectedPath.includes('darts-1.json')) {
      balance += piggyBank + (currentBetValue * 3);
      piggyBank = 0;
      deposit = 0;
    } else if (selectedPath.includes('darts-2.json')) {
      piggyBank += currentBetValue * 2;
    } else if (selectedPath.includes('darts-3.json')) {
      piggyBank += currentBetValue * 1.5;
    } else if (selectedPath.includes('darts-4.json')) {
      piggyBank += currentBetValue * 1.25;
    } else if (selectedPath.includes('darts-5.json')) {
      piggyBank += currentBetValue;
    } else if (selectedPath.includes('darts-lose.json')) {
      piggyBank = 0;
      deposit = 0;
    }
    document.getElementById('balance').textContent = formatNumber(balance);
    document.getElementById('piggy-bank').textContent = formatNumber(piggyBank);
    document.getElementById('deposit').textContent = formatNumber(deposit);



  }, 1000);




  currentAnimation.addEventListener('complete', () => {
    isPlaying = false; // Сбрасываем флаг после завершения

    // Возвращаем цвет кнопки обратно в черный
    // throwButton.classList.remove('active');
  });
}



// Начальная инициализация: показываем только седьмую анимацию
hideAllAnimations();
initialContainer.style.display = 'block';
