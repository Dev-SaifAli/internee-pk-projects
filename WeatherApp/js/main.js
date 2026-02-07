import AuthManager from "./auth.js";
import StorageManager from "./storage.js";
import { debounce } from "./constants.js";
import { CONFIG } from "./constants.js";
import { formatTemp } from "./constants.js";
import { getGreeting } from "./constants.js";
import { getWeatherIcon } from "./constants.js";

const authManager = new AuthManager();
const storageManager = new StorageManager();

document.addEventListener("DOMContentLoaded", () => {
  authManager.checkAuthStatus();
  initializeTheme();
  setupFormListener();
  setupLogoutListener();
  setupThemeListener();
  setupSearchListener();
});

function setupFormListener() {
  const authForm = document.getElementById("authForm");
  const emailError = document.getElementById("emailError");

  authForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target;

    const email = form.email.value.trim();

    if (!email) {
      emailError.classList.remove("d-none");
      emailError.textContent = "Email is required!";
      console.error("Email is required!");
      return;
    }

    const result = authManager.login(email);

    if (result.success) {
      console.log("User logged In successfully!");
      authManager.checkAuthStatus();

      form.email.value = "";
    } else {
      const emailError = document.getElementById("emailError");
      emailError.classList.remove("d-none");
      emailError.textContent = result.error;
    }
  });
}

function setupLogoutListener() {
  const logOutBtn = document.getElementById("logoutBtn");

  logOutBtn.addEventListener("click", () => {
    authManager.logout();
    authManager.checkAuthStatus();
  });
}
function setupThemeListener() {
  const themeToggle = document.getElementById("themeBtn");

  themeToggle.addEventListener("click", () => {
    let currentTheme = storageManager.getTheme();

    let newTheme = currentTheme === "light" ? "dark" : "light";

    storageManager.setTheme(newTheme);

    document.body.classList.remove(`bg-${currentTheme}`);
    document.body.classList.add(`bg-${newTheme}`);

    const icon =
      newTheme === "dark"
        ? `<i class="bi bi-brightness-high-fill"></i>`
        : ` <i class="bi bi-moon"></i>`;
    themeToggle.innerHTML = icon;
  });
}

function initializeTheme() {
  const currentTheme = storageManager.getTheme();

  document.body.classList.add(`bg-${currentTheme}`);

  const themeToggle = document.getElementById("themeBtn");
  const icon =
    currentTheme === "dark"
      ? `<i class="bi bi-brightness-high-fill"></i>`
      : ` <i class="bi bi-moon"></i>`;
  themeToggle.innerHTML = icon;
}

function setupSearchListener() {
  const searchInput = document.getElementById("searchInput");

  const DEBOUNCE_DELAY_MS = 300;

  const debouncedSearch = debounce((e) => {
    searchWeather(e.target.value);
  }, DEBOUNCE_DELAY_MS);

  function searchWeather(city) {
    const errorState = document.getElementById("errorState");
    const emptyState = document.getElementById("emptyState");

    if (!city || city.length < 2) {
      errorState.classList.add("d-none");
      emptyState.classList.remove("d-none");
      return;
    }
    fetchWeather(city);
  }
  searchInput.addEventListener("input", debouncedSearch);
}

async function fetchWeather(city) {
  const API_KEY = CONFIG.API_BASE_KEY;
  const API_URL = CONFIG.API_BASE_URL;
  const weatherAPI = `${API_URL}/weather?q=${city}&appId=${API_KEY}&units=metric`;

  const loadingState = document.getElementById("loadingState");
  const errorState = document.getElementById("errorState");
  const errorTitle = document.getElementById("errorTitle");
  const emptyState = document.getElementById("emptyState");

  try {
    loadingState.classList.remove("d-none");
    errorState.classList.add("d-none");

    const response = await fetch(weatherAPI);

    if (!response.ok) {
      throw new Error(`City not found.`);
    }

    const data = await response.json();
    console.log(data);

    displayWeather(data);
    emptyState.classList.add("d-none");
    errorState.classList.add("d-none");

    loadingState.classList.add("d-none");
  } catch (error) {
    loadingState.classList.add("d-none");

    errorState.classList.remove("d-none");
    errorTitle.textContent = error.message;
    console.error(`Error fetching weather: ${error.message}`);
  }
}
// {
//     "coord": {
//         "lon": 73.0833,
//         "lat": 31.4167
//     },
//     "weather": [
//         {
//             "id": 802,
//             "main": "Clouds",
//             "description": "scattered clouds",
//             "icon": "03n"
//         }
//     ],
//     "base": "stations",
//     "main": {
//         "temp": 17.13,
//         "feels_like": 15.81,
//         "temp_min": 17.13,
//         "temp_max": 17.13,
//         "pressure": 1017,
//         "humidity": 35,
//         "sea_level": 1017,
//         "grnd_level": 996
//     },
//     "visibility": 10000,
//     "wind": {
//         "speed": 0.97,
//         "deg": 27,
//         "gust": 1.11
//     },
//     "clouds": {
//         "all": 30
//     },
//     "dt": 1770394997,
//     "sys": {
//         "country": "PK",
//         "sunrise": 1770343031,
//         "sunset": 1770381977
//     },
//     "timezone": 18000,
//     "id": 1179400,
//     "name": "Faisalabad",
//     "cod": 200
// }
function displayWeather(data) {
  const weatherIcon = document.getElementById("weatherIcon");
  const cityName = document.getElementById("cityName");
  const updateTime = document.getElementById("updateTime");
  const weatherDesc = document.getElementById("weatherDesc");
  const temp = document.getElementById("temp");
  const humidity = document.getElementById("humidity");
  const windSpeed = document.getElementById("windSpeed");
  const pressure = document.getElementById("pressure");
  const visibility = document.getElementById("visibility");
  const uvIndex = document.getElementById("uvIndex");
  const tempMin = document.getElementById("tempMin");

  weatherIcon.textContent = getWeatherIcon(data.weather[0].description);
  cityName.textContent = data.name;
  weatherDesc.textContent = data.weather[0].description;
  temp.textContent = formatTemp(data.main.temp);
  humidity.textContent = data.main.humidity;
  windSpeed.textContent = data.wind.speed;
  pressure.textContent = data.main.pressure;
  visibility.textContent = data.visibility;
  tempMin.textContent = formatTemp(data.main.temp_min);
}
