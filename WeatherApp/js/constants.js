const CONFIG = {
    // Get your free API key at: https://openweathermap.org/api
    API_KEY: '46af05afdd56cc22e2abd59069c24603',
    API_BASE_URL: 'https://api.openweathermap.org/data/2.5',
    
    // Storage keys
    STORAGE_KEYS: {
        USER: 'weatherapp_user',
        RECENT_SEARCHES: 'weatherapp_recent_searches',
        THEME: 'weatherapp_theme',
        FAVORITES: 'weatherapp_favorites'
    },
    
    // Limits
    MAX_RECENT_SEARCHES: 5,
    MAX_FAVORITES: 10,
    
    // Time constants
    CACHE_DURATION: 30 * 60 * 1000, // 30 minutes
    
    // Weather icons mapping
    WEATHER_ICONS: {
        'clear sky': '☀️',
        'few clouds': '🌤️',
        'scattered clouds': '☁️',
        'broken clouds': '☁️',
        'shower rain': '🌧️',
        'rain': '🌧️',
        'thunderstorm': '⛈️',
        'snow': '❄️',
        'mist': '🌫️',
        'smoke': '💨',
        'haze': '🌫️',
        'dust': '💨',
        'fog': '🌫️',
        'sand': '💨',
        'ash': '💨',
        'squall': '💨',
        'tornado': '🌪️',
        'drizzle': '🌧️'
    }
};

