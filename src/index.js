let currentTemp = 49;
const updateTempDisplay = () => {
    const tempElement = document.getElementById("temperature");
    const landscapeElement = document.getElementById("landscape");

    tempElement.textContent = currentTemp;

    if (currentTemp >= 80) {
        tempElement.style.color = "red";
        landscapeElement.textContent = "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂";
    } else if (currentTemp >= 70) {
        tempElement.style.color = "orange";
        landscapeElement.textContent = "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷";
    } else if (currentTemp >= 60) {
        tempElement.style.color = "goldenrod";
        landscapeElement.textContent = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃";
    } else if (currentTemp >= 50) {
        tempElement.style.color = "green";
        landscapeElement.textContent = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
    } else {
        tempElement.style.color = "teal";
        landscapeElement.textContent =  "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
    }
};

const registerEventHandlers = () => {
    const increaseButton = document.getElementById("increase-temp");
    const decreaseButton = document.getElementById("decrease-temp");

    increaseButton.addEventListener("click", () => {
        currentTemp += 1;
        updateTempDisplay();
    });

    decreaseButton.addEventListener("click", () => {
        currentTemp -= 1;
        updateTempDisplay();
    });
};

const registeerCityNameInput =() => {
    const inputElement = document.getElementById("city-name-input");
    const headerElment = document.getElementById("header-city-name");

    inputElement.addEventListener("input", () => {
        headerElment.textContent = inputElement.value;
    });
};

document.addEventListener("DOMContentLoaded", () => {
    updateTempDisplay();
    registerEventHandlers();
});