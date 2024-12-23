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

  // Локальная переменная вместо Cloud Storage
  let currentBetValue = localStorage.getItem('current_bet') || '100';

  const highlightBet = (betElement) => {
    bets.forEach(bet => bet.classList.remove('selected'));
    betElement.classList.add('selected');
    currentBetValue = betElement.dataset.bet;
    localStorage.setItem('current_bet', currentBetValue);
  };

  const scrollToBet = (betElement) => {
    const offset = betElement.offsetLeft - choiceBet.offsetWidth / 2 + betElement.offsetWidth / 2;
    choiceBet.scrollTo({
      left: offset,
      behavior: 'smooth',
    });
    highlightBet(betElement);
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

  // Добавляем плавное центрирование при прокрутке
  let isScrolling;
  choiceBet.addEventListener('scroll', () => {
    clearTimeout(isScrolling);
    isScrolling = setTimeout(() => {
      const center = choiceBet.scrollLeft + choiceBet.clientWidth / 2;
      const closestBet = Array.from(bets).reduce((closest, bet) => {
        const betCenter = bet.offsetLeft + bet.offsetWidth / 2;
        const distance = Math.abs(center - betCenter);
        return distance < closest.distance ? { bet, distance } : closest;
      }, { bet: null, distance: Infinity }).bet;

      if (closestBet) {
        scrollToBet(closestBet);
      }
    }, 150);
  });

  // Добавляем выбор по клику
  bets.forEach(bet => {
    bet.addEventListener('click', () => scrollToBet(bet));
  });

  // Предотвращаем автоматический фокус
  document.body.scrollTo(0, 0);
});
