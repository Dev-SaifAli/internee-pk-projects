import { STORAGE_KEYS } from "./constants.js";
import { SETTINGS } from "./constants.js";

const USER_KEY = STORAGE_KEYS.USER;
const RECENT_SEARCHES_KEY = STORAGE_KEYS.RECENT_SEARCHES;
const THEME_KEY = STORAGE_KEYS.THEME;
const FAVORITES_KEY = STORAGE_KEYS.FAVORITES;

const MAX_RECENT_SEARCHES = SETTINGS.MAX_RECENT_SEARCHES;
const MAX_FAVORITES = SETTINGS.MAX_FAVORITES;
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

  addRecentSearch(city, weatherData) {
    try {
      let recentSearch = { city, weatherData };

      let prevSearches = this.getRecentSearches();

      let cityIndex = prevSearches.findIndex(
        (obj) => obj.city === recentSearch.city,
      );

      if (cityIndex === -1) {
        prevSearches.unshift(recentSearch);
      } else {
        prevSearches.splice(cityIndex, 1);
        prevSearches.unshift(recentSearch);
      }

      prevSearches = prevSearches.slice(0, MAX_RECENT_SEARCHES);
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(prevSearches));
      return true;
    } catch (error) {
      console.error("Failed to add recent search: ", error.message);
      return false;
    }
  }

  getRecentSearches() {
    try {
      return JSON.parse(localStorage.getItem(RECENT_SEARCHES_KEY)) || [];
    } catch (error) {
      console.error(error.message);
      return [];
    }
  }

  addFavorite(city, weather) {
    try {
      let favoriteWeather = { city, weather };

      let prevFavorites = this.getFavorites();

      let cityIndex = prevFavorites.findIndex(
        (obj) => obj.city === favoriteWeather.city,
      );

      if (cityIndex === -1) {
        prevFavorites.unshift(favoriteWeather);

        prevFavorites = prevFavorites.slice(0, MAX_FAVORITES);

        localStorage.setItem(FAVORITES_KEY, JSON.stringify(prevFavorites));
        return true;
      } else {
        console.log("City already favorited");
        return false;
      }
    } catch (error) {
      console.error("Failed to add favorite: ", error.message);
      return false;
    }
  }

  getFavorites() {
    try {
      return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
    } catch (error) {
      console.error("Failed to get favorites: ", error.message);
      return [];
    }
  }

  removeFavorite(city) {
    try {
      let existingFavorites = this.getFavorites();

      const filtered = existingFavorites.filter((obj) => obj.city !== city);

      localStorage.setItem(FAVORITES_KEY, JSON.stringify(filtered));
      return true;
    } catch (error) {
      console.error("Failed to remove favorite: ", error.message);
      return false;
    }
  }

  isFavorite(city) {
    try {
      const favoritesList = this.getFavorites();
      return favoritesList.some((obj) => obj.city === city);
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
  clearRecentSearches() {
    try {
      localStorage.removeItem(RECENT_SEARCHES_KEY);
      return true;
    } catch (error) {
      console.error(error.message);
      return false;
    }
  }
  clearFavorites() {
    try {
      localStorage.removeItem(FAVORITES_KEY);
      return true;
    } catch (error) {
      console.error(error.message);
      return false;
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
