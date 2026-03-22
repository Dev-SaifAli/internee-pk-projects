// API Configuration
export const CONFIG = Object.freeze({
  API_BASE_KEY: "46af05afdd56cc22e2abd59069c24603",
  API_BASE_URL: "https://api.openweathermap.org/data/2.5",
  TIME_DURATION: 10000,
  CACHE_DURATION: 30 * 60 * 1000,
});

// Storage keys
export const STORAGE_KEYS = Object.freeze({
  USER: "weatherapp_user",
  THEME: "weatherapp_theme",
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

export const WEATHER_BACKGROUNDS = Object.freeze({
  "clear sky":
    "https://images.unsplash.com/photo-1495567720989-cebdbdd97913?w=1200&h=800&fit=crop&q=80",
  "few clouds":
    "https://images.unsplash.com/photo-1463947628408-f8581a2f4aca?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "scattered clouds":
    "https://images.unsplash.com/photo-1742279461818-272fd20feb76?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "overcast clouds":
    "https://images.unsplash.com/photo-1500740516770-92bd004b996e?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D-1535694194199-ab7121d52c6f?w=1200&h=800&fit=crop&q=80",
  "light rain":
    "https://images.unsplash.com/photo-1613916937972-a6177bff0b95?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  rain: "https://images.unsplash.com/photo-1534265854528-0c270f95e0d8?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  thunderstorm:
    "https://images.unsplash.com/photo-1584267385289-81fdaa6efe7a?q=80&w=844&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  snow: "https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  mist: "https://images.unsplash.com/photo-1482841628122-9080d44bb807?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  haze: "https://images.unsplash.com/photo-1599059021750-82716ae2b661?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  smoke:
    "https://images.unsplash.com/photo-1666264474757-14530767b454?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
});
// App Settings
export const SETTINGS = Object.freeze({
  DEFAULT_THEME: "light",
});

// Utility Functions
/**
 * Get weather icon based on description
 * @param {string} description - Weather description from API
 * @returns {string} Emoji icon
 */

export function getWeatherIcon(description) {
  const desc = description.toLowerCase();

  for (const [key, icon] of Object.entries(WEATHER_ICONS)) {
    if (desc.includes(key)) {
      return icon;
    }
  }

  return "🌤️";
}

export function formatTemp(temp) {
  return Math.round(temp);
}

export function formatTime(timestamp) {
  const date = new Date(timestamp * 1000);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

export function formatDate() {
  const date = new Date();
  const options = { month: "short", day: "numeric", weekday: "short" };
  return date.toLocaleDateString("en", options);
}
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
export function getGreeting(username) {
  const hour = new Date().getHours();
  let firstName = username.split("@")[0].split(".")[0];
  let capitalizeFirstName  = capitalize(firstName)
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
  return `${greeting}, ${capitalizeFirstName}!👋`;
}
export function validateEmail(email) {
  if (typeof email !== "string") return "Invalid Input";

  if (!email || !email.trim()) return "Email is required";

  if (email.length > 254) return "Email is too long";

  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!pattern.test(email.trim())) return "Invalid Email Address";

  return null; // no error
}


export function debounce(func, delay) {
  let timeOutId;
  return function (...args) {
    clearTimeout(timeOutId);
    timeOutId = setTimeout(() => func.apply(this, args), delay);
  };
}
