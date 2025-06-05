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

const updateSkyView = (value) => {

    const skyElement = document.getElementById("sky");

    if (value === "sunny") {
        skyElement.textContent = "☁️ ☁️ ☁️ ☀️ ☁️ ☁️";
    } else if (value === "cloudy") {
        skyElement.textContent = "☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️";
    } else if (value === "rainy") {
        skyElement.textContent = "🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧";
    } else {
        skyElement.textContent =  "🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨";
    };
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

    resetCityButton.addEventListener("click", () => {
    resetCityName();
    });
};

// Update the header city name as user types
const registerCityNameInput =() => {
    const inputElement = document.getElementById("city-name-input");
    const headerElment = document.getElementById("header-city-name");
    inputElement.addEventListener("input", () => {
        headerElment.textContent = inputElement.value;
    });
};

//Update the sky display based on the selected option
const registerSelectedSky = () => {
    const skySelectElement = document.getElementById("sky-select");
    skySelectElement.addEventListener("change", () => {
    updateSkyView(skySelectElement.value)
    });
};


// Send requests to proxy server to get real-time temperature
const getRealTimeTemperature = () => {
    const city = document.getElementById("city-name-input").value;

    axios
    // .get("http://localhost:5000/location", {
    .get("http://127.0.0.1:3000/location", {
        params: { q: city },
    })
    .then((locationResponse) => {
        const { lat, lon } = locationResponse.data[0];
        // return axios.get("http://localhost:5000/weather", {
        return axios.get("http://127.0.0.1:3000/weather", {
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



// Initialize all UI and event setup when page is loaded
document.addEventListener("DOMContentLoaded", () => {
    updateTempDisplay();
    registerEventHandlers();
    registerCityNameInput();
    registerSelectedSky();
});


