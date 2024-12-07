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












// Появление всех элементов при загрузке страницы
// window.addEventListener('DOMContentLoaded', () => {
//   const children = document.querySelectorAll('.content > *');
//   children.forEach((child, index) => {
//     setTimeout(() => {
//       child.classList.add('visible');
//     }, index * 25); // Задержка для каждого дочернего элемента
//   });
// });


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




