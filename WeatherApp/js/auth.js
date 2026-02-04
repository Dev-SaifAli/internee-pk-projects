import StorageManager from "./storage.js";
import { validateEmail } from "./constants.js";

class AuthManager {
  constructor() {
    this.currentUser = StorageManager.getUser();
    this.checkAuthStatus();
  }

  checkAuthStatus() {
    if (this.isAuthenticated()) {
      this.showWeatherPage();
    } else {
      this.showAuthPage();
    }
  }

  login(email) {
    try {
      const error = validateEmail(email);

      if (error) return { success: false, error: error };

      const cleanEmail = email.trim.toLowerCase();

      StorageManager.saveUser(cleanEmail);

      this.currentUser = cleanEmail;

      return { success: true, error: null };
    } catch (error) {
      console.error("Failed to logIn: ", error.message);
      return { success: false, error: "An unexpected error occurred" };
    }
  }

  logout() {
    StorageManager.clearUser();
    this.currentUser = null;
    return { success: true, error: null };
  }
  isAuthenticated() {
    return StorageManager.isUserLoggedIn();
  }
  getCurrentUser() {
    return this.currentUser ? this.currentUser : null;
  }

  showAuthPage() {
    document.getElementById("authPage").classList.remove("d-none");
    document.getElementById("weatherApp").classList.add("d-none");
  }
  showWeatherPage() {
    document.getElementById("authPage").classList.add("d-none");
    document.getElementById("weatherApp").classList.remove("d-none");
  }
}
