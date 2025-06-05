// Set the initial temperature value
let currentTemp = 49;

// Update the temperature text and landscape visuals
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

// Add event listeners for temperature buttons and real-time fetch
const registerEventHandlers = () => {
    const increaseButton = document.getElementById("increase-temp");
    const decreaseButton = document.getElementById("decrease-temp");
    const getRealTempButton = document.getElementById("get-real-temp");

    increaseButton.addEventListener("click", () => {
        currentTemp += 1;
        updateTempDisplay();
    });

    decreaseButton.addEventListener("click", () => {
        currentTemp -= 1;
        updateTempDisplay();
    });

    getRealTempButton.addEventListener("click", () => {
        getRealTimeTemperature();
    }) ; 
};

// Update the header city name as user types
const registerCityNameInput =() => {
    const inputElement = document.getElementById("city-name-input");
    const headerElment = document.getElementById("header-city-name");
    inputElement.addEventListener("input", () => {
        headerElment.textContent = `🌤 Weather Report for ${inputElement.value} 🌎`;
    });
};

// Send requests to proxy server to get real-time temperature
const getRealTimeTemperature = () => {
    const city = document.getElementById("city-name-input").value;

    axios
    .get("http://localhost:5000/location", {
        params: { q: city },
    })
    .then((locationResponse) => {
        const { lat, lon } = locationResponse.data[0];
        return axios.get("http://localhost:5000/weather", {
        params: { lat: lat, lon: lon },
        });
    })
    .then((weatherResponse) => {
        const kelvin = weatherResponse.data.main.temp;
        const fahrenheit = Math.round((kelvin - 273.15) * (9 / 5) + 32);
        currentTemp = fahrenheit;
        updateTempDisplay();
    })
    .catch((error) => {
        console.error("⚠️ Error fetching temperature data:", error);
        alert("Could not fetch real-time temperature. Check console.");
    });
};

const updateSkyView = (selected) => {
    const skyElement = document.getElementById("sky");

    if (selected === "sunny") {
        skyElement.textContent = "☁️ ☁️ ☁️ ☀️ ☁️ ☁️";
    } else if (selected === "cloudy") {
        skyElement.textContent = "☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️";
    } else if (selected === "rainy") {
        skyElement.textContent = "🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧";
    } else if (selected === "snowy") {
        skyElement.textContent = "🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨";
    }
};

// Update the sky display based on the selected option
const registerSkySelector = () => {
    const skySelect = document.getElementById("sky-select");

    skySelect.addEventListener("change", () => {
    updateSkyView(skySelect.value)
    });
};

    // Reset the city name to default when button is clicked
    const registerResetButton = () => {
    const resetButton = document.getElementById("reset-city");
    const cityInput = document.getElementById("city-name-input");
    const headerEl = document.getElementById("header-city-name");

    resetButton.addEventListener("click", () => {
    const defaultCity = "Seattle";
    cityInput.value = defaultCity;
    headerEl.textContent = `🌤 Weather Report for ${defaultCity} 🌎`;
    });
};

// Initialize all UI and event setup when page is loaded
document.addEventListener("DOMContentLoaded", () => {
    updateTempDisplay();
    registerEventHandlers();
    registerCityNameInput();
    registerSkySelector();
    registerResetButton();
});


