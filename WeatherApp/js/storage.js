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
      const recentSearch = { city, weatherData };

      const prevSearches = this.getRecentSearches();

      const cityIndex = prevSearches.findIndex(
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
      const favoriteWeather = { city, weather };

      const prevFavorites = this.getFavorites();

      const cityIndex = prevFavorites.findIndex(
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

  removeFavorite() {
    try {
      localStorage.removeItem(FAVORITES_KEY);
      return true;
    } catch (error) {
      console.error("Failed to remove favorite: ", error.message);
      return false;
    }
  }

  isFavorite(city){
    
  }
}
