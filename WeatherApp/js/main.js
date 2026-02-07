import AuthManager from "./auth.js";
import StorageManager from "./storage.js";
import { debounce } from "./constants.js";
import { CONFIG } from "./constants.js";
import { formatTemp } from "./constants.js";
import { getWeatherIcon } from "./constants.js";
import { applyWeatherBackground } from "./ui.js";
import { formatDate } from "./constants.js";
import { formatTime } from "./constants.js";
import { getGreeting } from "./constants.js";

const authManager = new AuthManager();
const storageManager = new StorageManager();

document.addEventListener("DOMContentLoaded", () => {
  authManager.checkAuthStatus();
  initializeTheme();
  setupFormListener();
  setupLogoutListener();
  setupThemeListener();
  setupSearchListener();
  updateDate();
  displayGreeting();

  setupGeolocationListener();
});

function displayGreeting() {
  const greetingMsg = document.getElementById("greetingMsg");

  const user = authManager.getCurrentUser();
  if (user) {
    const greeting = getGreeting(user.email);
    greetingMsg.textContent = greeting;
  } else {
    greetingMsg.textContent = "Welcome User!";
  }
}

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
      displayGreeting();

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
  const greetingMsg = document.getElementById("greetingMsg");

  logOutBtn.addEventListener("click", () => {
    authManager.logout();
    authManager.checkAuthStatus();
    greetingMsg.textContent = "Welcome User!";
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
      document.body.style.background = "";
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

    const weatherDescription = data.weather[0].description;
    applyWeatherBackground(weatherDescription);

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
function displayWeather(data) {
  const weatherIcon = document.getElementById("weatherIcon");
  const cityName = document.getElementById("cityName");
  const weatherDesc = document.getElementById("weatherDesc");
  const temp = document.getElementById("temp");
  const humidity = document.getElementById("humidity");
  const windSpeed = document.getElementById("windSpeed");
  const pressure = document.getElementById("pressure");
  const visibility = document.getElementById("visibility");
  const tempMin = document.getElementById("tempMin");
  const updateTime = document.getElementById("updateTime");

  weatherIcon.textContent = getWeatherIcon(data.weather[0].description);
  cityName.textContent = data.name;
  weatherDesc.textContent = data.weather[0].description;
  temp.textContent = formatTemp(data.main.temp);
  humidity.textContent = data.main.humidity;
  windSpeed.textContent = data.wind.speed;
  pressure.textContent = data.main.pressure;
  visibility.textContent = data.visibility;
  tempMin.textContent = formatTemp(data.main.temp_min);
  updateTime.textContent = formatTime(data.dt);
}

function updateDate() {
  const updateDate = document.getElementById("updateDate");
  updateDate.textContent = formatDate();
}
function setupGeolocationListener() {
  const locationBtn = document.getElementById("locationBtn");
  const loadingState = document.getElementById("loadingState");
  const errorState = document.getElementById("errorState");

  locationBtn.addEventListener("click", () => {
    // Check if browser supports geolocation
    if (!navigator.geolocation) {
      console.error("Geolocation not supported");
      errorState.classList.remove("d-none");
      errorState.textContent = "Geolocation not supported";
      return;
    }

    // Show loading
    loadingState.classList.remove("d-none");

    // Get user's location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        console.log(`Location: ${lat}, ${lon}`);

        fetchWeatherByCoordinates(lat, lon);
      },
      (error) => {
        loadingState.classList.add("d-none");
        errorState.classList.remove("d-none");

        if (error.code === error.PERMISSION_DENIED) {
          errorState.textContent = "Location permission denied";
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          errorState.textContent = "Location unavailable";
        } else {
          errorState.textContent = "Error getting location";
        }

        console.error("Geolocation error:", error.message);
      },
    );
  });
}
async function fetchWeatherByCoordinates(latitude, longitude) {
  const API_KEY = CONFIG.API_BASE_KEY;
  const API_URL = CONFIG.API_BASE_URL;

  // Use lat/lon instead of city name
  const weatherAPI = `${API_URL}/weather?lat=${latitude}&lon=${longitude}&appId=${API_KEY}&units=metric`;

  const loadingState = document.getElementById("loadingState");
  const errorState = document.getElementById("errorState");
  const emptyState = document.getElementById("emptyState");

  try {
    loadingState.classList.remove("d-none");
    errorState.classList.add("d-none");

    const response = await fetch(weatherAPI);

    if (!response.ok) {
      throw new Error("Failed to fetch weather");
    }

    const data = await response.json();
    console.log("Weather data:", data);

    const weatherDescription = data.weather[0].description;
    applyWeatherBackground(weatherDescription);

    // Display weather
    displayWeather(data);


    emptyState.classList.add("d-none");
    errorState.classList.add("d-none");
    loadingState.classList.add("d-none");
  } catch (error) {
    loadingState.classList.add("d-none");
    errorState.classList.remove("d-none");
    errorState.textContent = error.message;
    console.error("Error fetching weather:", error.message);
  }
}
