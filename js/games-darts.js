







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

// function setTGItem(key, value) {
//   return new Promise(resolve => {
//     telegram.CloudStorage.setItem(key, value, function () {
//       resolve();
//     });
//   });
// }
function setTGItem(key, value) {
  return new Promise((resolve, reject) => {
    telegram.CloudStorage.setItem(key, value, (err, success) => {
      if (!err && (success === true || success === 'true')) {
        console.log('ОТВЕТ ЗАПРОСА: ', success);
        resolve(true); // Успешно завершено
      } else {
        reject(err || new Error(`Failed to store ${key}`)); // Возвращаем ошибку
      }
    });
  });
}







// Функция для форматирования чисел
const formatNumber = (num) => Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');





let currentBetValue = Number(localStorage.getItem('current_bet')) || 500;
// let balance = 1000000;
// let piggyBank = 0;
// let deposit = 0;

let animationIsPlaying = false; // Активна ли анимация

let balance;
let piggyBank;
let deposit;
let user_name;


async function initializeData() {
  if (telegram.isVersionAtLeast('6.9')) {
    try {
      user_name = await getTGItem('user_name');
      balance = Number(await getTGItem('balance'));
      const telegramDartsData = JSON.parse(await getTGItem('darts') || '{}');
      piggyBank = telegramDartsData.piggy_bank;
      deposit = telegramDartsData.deposit;
      throws = telegramDartsData.throws;
      if (
        piggyBank === undefined ||
        deposit === undefined ||
        throws === undefined
      ) {
        // window.location.href = '../../ban';
      }
    } catch {
      // window.location.href = '../../ban';
    }
  } else {
    // window.location.href = '../../ban';
  }
}





document.addEventListener('DOMContentLoaded', async () => {

  user_name = await getTGItem('user_name');
  balance = Number(await getTGItem('balance'));
  let telegramDartsData = JSON.parse(await getTGItem('darts') || '{}');
  roundStartTime = telegramDartsData.round_start_time;
  piggyBank = telegramDartsData.piggy_bank;
  deposit = telegramDartsData.deposit;
  throws = telegramDartsData.throws;
  if (
    roundStartTime === undefined ||
    piggyBank === undefined ||
    deposit === undefined ||
    throws === undefined
  ) {
    // window.location.href = '../../ban';
  }




  // СКРОЛЛ СУММ СТАВКИ И УПРАВЛЕНИЕ ТЕКУЩЕЙ СУММОЙ СТАВКИ
  // 

  const choiceBet = document.querySelector('.choice-bet');
  const bets = document.querySelectorAll('.bet');

  document.getElementById('balance').textContent = formatNumber(balance);
  document.getElementById('piggy-bank').textContent = formatNumber(piggyBank);
  document.getElementById('deposit').textContent = formatNumber(deposit);



  const highlightBet = (betElement) => {
    bets.forEach(bet => bet.classList.remove('selected'));
    betElement.classList.add('selected');
    localStorage.setItem('current_bet', betElement.dataset.bet);
    currentBetValue = Number(betElement.dataset.bet)

    if (currentBetValue > balance) {
      document.getElementById('throw-button').style.opacity = 0.25;
    } else {
      document.getElementById('throw-button').style.opacity = 1;
    }
  };

  const getCenterBet = () => {
    const center = choiceBet.scrollLeft + choiceBet.clientWidth / 2;
    return Array.from(bets).reduce((closest, bet) => {
      const betCenter = bet.offsetLeft + bet.offsetWidth / 2;
      const distance = Math.abs(center - betCenter);
      return distance < closest.distance ? { bet, distance } : closest;
    }, { bet: null, distance: Infinity }).bet;
  };

  const initialBetElement = Array.from(bets).find(bet => bet.dataset.bet === String(currentBetValue));
  if (initialBetElement) {
    choiceBet.scrollTo({
      left: initialBetElement.offsetLeft - choiceBet.offsetWidth / 2 + initialBetElement.offsetWidth / 2,
      behavior: 'auto',
    });
    highlightBet(initialBetElement);
  }

  let lastBet = null;
  choiceBet.addEventListener('scroll', () => {
    const centerBet = getCenterBet();
    if (centerBet && centerBet !== lastBet) {
      highlightBet(centerBet);
      hapticFeedback('change');
      lastBet = centerBet;
    }
  });

  bets.forEach(bet => {
    bet.addEventListener('click', () => {
      if (animationIsPlaying) return;
      const offset = bet.offsetLeft - choiceBet.offsetWidth / 2 + bet.offsetWidth / 2;
      choiceBet.scrollTo({
        left: offset,
        behavior: 'smooth',
      });
      highlightBet(bet);
    });
  });

  document.body.scrollTo(0, 0);



  // ЗАГРУЗКА АНИМАЦИЙ И ВКЛЮЧЕНИЕ СТАРТОВОЙ АНИМАЦИИ
  // 

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

  let currentAnimation = null;
  let initialMode = true;

  const initialContainer = document.createElement('div');
  container.appendChild(initialContainer);

  const initialAnimationInstance = bodymovin.loadAnimation({
    container: initialContainer,
    path: `animations/${initialAnimation}`,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    name: 'initial-animation',
  });

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

  function hideAllAnimations() {
    animationInstances.forEach(instance => {
      instance.wrapper.style.display = 'none';
    });
    initialContainer.style.display = 'none';
  }
  function showCurrentAnimation(animation) {
    if (animation) {
      animation.wrapper.style.display = 'block';
    }
  }
  function stopCurrentAnimation() {
    if (currentAnimation) {
      currentAnimation.stop();
      currentAnimation.goToAndStop(0, true);
    }
  }



  // ПОКАЗ ЭЛЕМЕНТОВ СТРАНИЦЫ
  const children = document.querySelectorAll('.content > *');
  children.forEach((child, index) => {
    setTimeout(() => {
      child.classList.add('visible');
    }, index * 25);
  });



  // НАЖАТИЕ НА КНОПКУ "БРОСОК": вибрация, отключение прокрутки ставок и анимация кнопки "Бросок"
  // 

  throwButton.addEventListener('click', () => {
    if (animationIsPlaying) return;

    document.getElementById('throw-button').style.transform = 'scale(0.95)';
    setTimeout(() => {
      document.getElementById('throw-button').style.transform = 'scale(1)';
    }, 100);

    if (currentBetValue <= balance) {
      animationIsPlaying = true;
      hapticFeedback('soft');
      document.getElementById('choice-bet').style.overflow = 'hidden';
      document.getElementById('choice-bet').style.opacity = 0.5;
      document.getElementById('throw-button').style.opacity = 0.5;
    } else {
      hapticFeedback('error');
      document.getElementById('throw-button').style.opacity = 0.25;
      document.getElementById('balance').style.color = '#F22D3D';
      setTimeout(() => {
        document.getElementById('balance').style.color = 'white';
      }, 200);
      return;
    }

    if (initialMode) {
      initialAnimationInstance.loop = false;
      initialAnimationInstance.addEventListener('complete', () => {
        initialMode = false;
        hideAllAnimations();
        playRandomAnimation();
      });
    } else {
      playRandomAnimation();
    }
  });



  // ИГРА
  // 

  async function playRandomAnimation() {
    stopCurrentAnimation();
    hideAllAnimations();

    const startTime = Date.now();

    // Выбираем случайную анимацию
    const randomIndex = Math.floor(Math.random() * animationInstances.length);
    currentAnimation = animationInstances[randomIndex];

    // Показываем текущую анимацию
    showCurrentAnimation(currentAnimation);
    currentAnimation.play();

    animationIsPlaying = true;


    const balanceElement = document.getElementById('balance');
    const piggyBankElement = document.getElementById('piggy-bank');
    const depositElement = document.getElementById('deposit');

    animateCounter(balanceElement, balance, balance - currentBetValue, 250);
    animateCounter(depositElement, deposit, deposit + currentBetValue, 250);
    balance -= currentBetValue;
    deposit += currentBetValue;


    // Выбор рандомной анимации
    const animationName = animations[randomIndex].split('/').pop().replace('.json', '');



    let balanceBefore = balance
    let depositBefore = deposit
    let piggyBankBefore = piggyBank

    const multipliers = {
      'darts-1': 5.05,
      'darts-2': 2.35,
      'darts-3': 1.45,
      'darts-4': 1.15,
      'darts-5': 1.05
    }


    if (animationName === 'darts-1') {
      piggyBankBefore += currentBetValue * multipliers[animationName];
      balance += piggyBankBefore;
      piggyBank = 0;
      deposit = 0;
    } else if (['darts-2', 'darts-3', 'darts-4', 'darts-5'].includes(animationName)) {
      piggyBank += currentBetValue * multipliers[animationName];
    } else {
      piggyBank = 0;
      deposit = 0;
    }



    await Promise.all([
      new Promise(async (resolve) => {
        // const dartsData = await getTGItem('darts'); // Ждем результата выполнения
        // telegramDartsData = JSON.parse(dartsData || '{}'); // Парсим только строку
        telegramDartsData = JSON.parse(await getTGItem('darts') || '{}');
        roundStartTimeCheck = telegramDartsData.round_start_time;
        if (roundStartTimeCheck === undefined) {
          // window.location.href = '../../ban';
        } else if (roundStartTime != roundStartTimeCheck) {
          location.reload(true);
        }
        if (roundStartTime === null || roundStartTime === 0) {
          roundStartTime = Math.floor(Date.now() / 1000);
        }
        telegramDartsData = {
          'round_start_time': roundStartTime,
          'piggy_bank': piggyBank,
          'deposit': deposit,
          'throws': 0
        }
        resolve();
      }),

      // Момент удара дротика: вибрация и визуальное изменение чисел
      new Promise(resolve => setTimeout(() => {
        hapticFeedback('heavy');
        if (animationName === 'darts-1') {
          showRoundResult(piggyBankBefore - depositBefore);
          animateCounter(balanceElement, balanceBefore, balance, 250);
          animateCounter(piggyBankElement, piggyBankBefore, 0, 250);
          animateCounter(depositElement, depositBefore, 0, 250);
        } else if (['darts-2', 'darts-3', 'darts-4', 'darts-5'].includes(animationName)) {
          animateCounter(piggyBankElement, piggyBankBefore, piggyBank, 250);
        } else {
          showRoundResult(depositBefore * -1);
          animateCounter(piggyBankElement, piggyBankBefore, 0, 250);
          animateCounter(depositElement, depositBefore, 0, 250);
        }
        if (balance < currentBetValue) {
          document.getElementById('throw-button').style.opacity = 0.25;
        }
        resolve();
      }, 1000))

    ]);


    // Создаем массив промисов для всех запросов
    const keysToAdd = [
      setTGItem('balance', balance),
      setTGItem('darts', JSON.stringify(telegramDartsData))
    ];

    // Ожидаем завершения всех запросов
    Promise.all(keysToAdd)
      .then(() => {
        const elapsedTime = Date.now() - startTime;

        if (elapsedTime >= 1500) {
          // Если прошло больше или равно 1.5 секунд — останавливаем анимацию
          animationIsPlaying = false;
          console.log('Анимация остановлена');
          if (balance >= currentBetValue) {
            document.getElementById('throw-button').style.opacity = 1;
          }
          document.getElementById('choice-bet').style.opacity = 1;
          document.getElementById('choice-bet').style.overflow = 'auto';
        } else {
          // Если 1.5 секунды еще не прошло, ждём завершения
          setTimeout(() => {
            animationIsPlaying = false;
            console.log('Анимация остановлена');
            if (balance >= currentBetValue) {
              document.getElementById('throw-button').style.opacity = 1;
            }
            document.getElementById('choice-bet').style.opacity = 1;
            document.getElementById('choice-bet').style.overflow = 'auto';
          }, 1500 - elapsedTime);
        }

      })

      .catch((err) => {
        // Если хотя бы один запрос завершился с ошибкой
        console.error('Ошибка при добавлении ключей:', err);
        // window.location.href = '../../ban'; // Переход на другую страницу в случае ошибки
      });









  }


  // Начальная инициализация анимаций
  hideAllAnimations();
  initialContainer.style.display = 'block';
});









// АНИМАЦИЯ ИЗМЕНЕНИЯ ЧИСЕЛ
function animateCounter(element, startValue, endValue, duration) {
  const range = endValue - startValue;
  const startTime = performance.now();
  function updateCounter(currentTime) {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1);
    const currentValue = Math.round(startValue + range * progress);
    element.textContent = formatNumber(currentValue);
    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    }
  }
  requestAnimationFrame(updateCounter);
}




function showRoundResult(num) {

  let roundResult;
  if (Number(num) < 0) {
    roundResult = '- ' + formatNumber(Number(num) * -1)
  } else {
    roundResult = '+ ' + formatNumber(num)
  }

  const container = document.getElementById('animation-container');

  // Создаем элемент для сообщения
  const messageElement = document.createElement('div');
  messageElement.className = 'round-result';

  // Добавляем изображение
  const imgElement = document.createElement('img');
  imgElement.src = '../../images/coin.png';
  imgElement.alt = 'icon';

  // Добавляем текст
  const textElement = document.createElement('span');
  textElement.textContent = roundResult;
  if (Number(num) < 0) {
    textElement.style.color = '#F22D3D';
  } else {
    textElement.style.color = '#2df249';
  }

  // Собираем структуру
  // messageElement.appendChild(imgElement);
  messageElement.appendChild(textElement);

  // Добавляем элемент в контейнер
  container.appendChild(messageElement);

  // Удаляем элемент после завершения анимации (4 секунды)
  setTimeout(() => {
    messageElement.remove();
  }, 3000);
}




