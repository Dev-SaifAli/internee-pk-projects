// API Configuration
const CONFIG = Object.freeze({
  API_BASE_KEY: "46af05afdd56cc22e2abd59069c24603",
  API_BASE_URL: "https://api.openweathermap.org/data/2.5/",
  TIME_DURATION: 10000,
  CACHE_DURATION: 30 * 60 * 1000,
});

// Storage keys
export const STORAGE_KEYS = Object.freeze({
  USER: "weatherapp_user",
  RECENT_SEARCHES: "weatherapp_recent_searches",
  THEME: "weatherapp_theme",
  FAVORITES: "weatherapp_favorites",
});

const WEATHER_ICONS = Object.freeze({
  "clear sky": "☀️",
  "few clouds": "🌤️",
  "scattered clouds": "☁️",
  "broken clouds": "☁️",
  "shower rain": "🌧️",
  rain: "🌧️",
  thunderstorm: "⛈️",
  snow: "❄️",
  mist: "🌫️",
  smoke: "💨",
  haze: "🌫️",
  dust: "💨",
  fog: "🌫️",
  sand: "💨",
  ash: "💨",
  squall: "💨",
  tornado: "🌪️",
  drizzle: "🌧️",
});

// App Settings
export const SETTINGS = Object.freeze({
  MAX_RECENT_SEARCHES: 5,
  MAX_FAVORITES: 10,
  DEFAULT_THEME: "light",
});

// Utility Functions
/**
 * Get weather icon based on description
 * @param {string} description - Weather description from API
 * @returns {string} Emoji icon
 */

function getWeatherIcon(description) {
  const desc = description.toLowerCase();

  for (const [key, icon] of Object.entries(WEATHER_ICONS)) {
    if (desc.includes(key)) {
      return icon;
    }
  }

  return "🌤️";
}

function formatTemp(temp) {
  return Math.round(temp);
}

function formatTime(timestamp) {
  const date = new Date(timestamp * 1000);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

function formatDate(timestamp) {
  const date = new Date(timestamp * 1000);
  const options = { month: "short", day: "numeric", weekday: "short" };
  return date.toLocaleDateString("en", options);
}

function getGreeting(username) {
  const hour = new Date().getHours();
  let firstName = username.split("@")[0];
  let greeting;
  if (hour < 12) {
    greeting = "🌅 Good Morning";
  } else if (hour < 18) {
    greeting = "☀️ Good Afternoon";
  } else if (hour < 21) {
    greeting = "🌆 Good Evening";
  } else {
    greeting = "🌙 Good Night";
  }
  return `${greeting}, ${firstName}!`;
}
export function validateEmail(email) {
  if (typeof email !== "string") return "Invalid Input";

  if (!email || !email.trim()) return "Email is required";

  if (email.length > 254) return "Email is too long";

  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!pattern.test(email.trim())) return "Invalid Email Address";

  return null; // no error
}
function capitalize(str) {
  return str.charAt(0).toUppercase() + str.slice(1);
}

export function debounce(func, delay) {
  let timeOutId;
  return function (...args) {
    clearTimeout(timeOutId);
    timeOutId = setTimeout(func.apply(this, args), delay);
  };
}
