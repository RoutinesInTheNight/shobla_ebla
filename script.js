const counterElement = document.getElementById("counter");
const buttonElement = document.getElementById("incrementButton");

// Функция для загрузки текущего значения счётчика
async function fetchCounter() {
    try {
        const response = await fetch("https://cdc9aaed-fcbc-40d5-b3db-e71f753186b3.tunnel4.com/counter");
        if (!response.ok) throw new Error("Ошибка загрузки числа");
        const data = await response.json();
        counterElement.textContent = data.value;
    } catch (error) {
        counterElement.textContent = "Ошибка загрузки числа";
    }
}

// Функция для увеличения счётчика
async function incrementCounter() {
    try {
        const response = await fetch("https://cdc9aaed-fcbc-40d5-b3db-e71f753186b3.tunnel4.com/increment", { method: "POST" });
        if (!response.ok) throw new Error("Ошибка обновления числа");
        const data = await response.json();
        counterElement.textContent = data.value;
    } catch (error) {
        counterElement.textContent = "Ошибка обновления числа";
    }
}

// Устанавливаем обработчик событий и загружаем начальное значение
buttonElement.addEventListener("click", incrementCounter);
fetchCounter();
