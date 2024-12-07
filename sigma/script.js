let tg = window.Telegram.WebApp; //получаем объект webapp телеграма 
tg.expand();
tg.MainButton.text = "ВЕРНУТЬСЯ В БОТА";
tg.MainButton.show();

tg.onEvent('mainButtonClicked', function() {
    tg.HapticFeedback.impactOccurred('soft')
	tg.close(); 
});
tg.expand();



// function setWebsiteBackgroundColor(colorScheme, navigationBars) {
//     const body = document.body;

//     if (colorScheme === 'dark') {
//         body.style.backgroundColor = 'black';
//         navigationBars.forEach(navigationBar => {
//             navigationBar.style.backgroundColor = '#1C1B1E';
//         });
//     } else {
//         body.style.backgroundColor = '#F2F1F6';

//     }
// }

// function setThemeClass() {
//     const colorScheme = Telegram.WebApp.colorScheme;
//     const navigationBars = document.querySelectorAll('.navigationBar');
//     setWebsiteBackgroundColor(colorScheme, navigationBars);
// }

// Telegram.WebApp.onEvent('themeChanged', setThemeClass);
// setThemeClass();




function showPage(pageId) {
  tg.HapticFeedback.impactOccurred('soft')
  tg.expand();

  // Смещает главную страницу влево
  var mainPage = document.getElementById('main-page');
  mainPage.style.transform = "translateX(-40%)";

  // Отобразить выбранную страницу
  var pageToShow = document.getElementById(pageId);
  if (pageToShow) {
    pageToShow.style.visibility = "visible";
    pageToShow.style.transform = "translateX(0)";
    pageToShow.style.height = "auto";
    pageToShow.style.width = "100vw";
  }

  // Скрыть первую страницу через небольшую задержку
  setTimeout(function() {
    if (mainPage) {
        mainPage.style.display = "none";
        mainPage.style.transform = "translateX(-100%)";
        };
  }, 500); // Задержка 500 миллисекунд

      // Прокрутить страницу вверх
  setTimeout(function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  tg.MainButton.setText("< НАЗАД");
  
}
  







  
  
  
  
  
  
  