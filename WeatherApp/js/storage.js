import { STORAGE_KEYS } from "./constants.js";
import { SETTINGS } from "./constants.js";

const USER_KEY = STORAGE_KEYS.USER;
const THEME_KEY = STORAGE_KEYS.THEME;

const DEFAULT_THEME = SETTINGS.DEFAULT_THEME;



class StorageManager {
  saveUser(email) {
    const user = {
      email: email,
      loginTime: Date.now(),
    };

    try {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      return true;
    } catch (error) {
      console.error("Failed to save user ", error.message);
      return false;
    }
  }

  getUser() {
    try {
      const user = localStorage.getItem(USER_KEY);
      if (!user) return null;
      const parsed = JSON.parse(user);
      return parsed;
    } catch (error) {
      console.error(error.message);
      return null;
    }
  }

  clearUser() {
    try {
      localStorage.removeItem(USER_KEY);
      return true;
    } catch (error) {
      console.error(error.message);
      return false;
    }
  }



  setTheme(theme) {
    try {
      localStorage.setItem(THEME_KEY, JSON.stringify(theme));
      return true;
    } catch (error) {
      console.error("Failed to set theme: ", error.message);
      return false;
    }
  }

  getTheme() {
    try {
      return JSON.parse(localStorage.getItem(THEME_KEY)) || DEFAULT_THEME;
    } catch (error) {
      console.error(error.message);
      return DEFAULT_THEME;
    }
  }
  
  isUserLoggedIn() {
    try {
      const user = this.getUser();
      return user !== null;
    } catch (error) {
      console.error(error.message);
      return false;
    }
  }
}
export default StorageManager;
