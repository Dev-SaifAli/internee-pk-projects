import AuthManager from "./auth.js";
import StorageManager from "./storage.js";
import { debounce } from "./constants.js";

const authManager = new AuthManager();
const storageManager = new StorageManager();

document.addEventListener("DOMContentLoaded", () => {
  authManager.checkAuthStatus();
  setupFormListener();
  setupLogoutListener();
  setupThemeListener();
  setupSearchListener();
});

function setupFormListener() {
  const authForm = document.getElementById("authForm");

  authForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target;

    const email = form.email.value.trim();

    if (!email) {
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

    document.body.classList.add(`bg-${newTheme}`);

    const icon =
      newTheme === "dark"
        ? `<i class="bi bi-brightness-high-fill"></i>`
        : ` <i class="bi bi-moon"></i>`;
    themeToggle.innerHTML = icon;
  });
}

function setupSearchListener() {
  const searchInput = document.getElementById("searchInput");

  searchInput.addEventListener("input", debouncedSearch);
}
const DEBOUNCE_DELAY_MS = 300;
const debouncedSearch = debounce((e) => {
  searchWeather(e.target.value);
}, DEBOUNCE_DELAY_MS);

function searchWeather(city) {
  if (!city || city.length < 2) {
    return;
  }
  console.log("Searching for city: ", city);
}
