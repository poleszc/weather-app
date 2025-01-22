export const DEFAULT_MAP_ZOOM = 7;
export const DEFAULT_MAP_LOCATION = [0, 0];
export const DEFAULT_SCROLL_WHEEL_ZOOM = true;
export const DEFAULT_MAX_CITIES_NUMBER = 20;
export const DEFAULT_DOWNLOAD_DEBOUNCE_TIME = 2000;
export const DEFAULT_FILTER_DEBOUNCE_TIME = 200;
export const OVERPASS_API_URL = `https://overpass-api.de/api/interpreter`;
export const WEATHER_API_URL = 'http://api.weatherapi.com/v1/current.json';
export const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
export const DEFAULT_WEATHER_REFRESH_INTERVAL = 60 * 60 * 1000;

export const IDEAL_TEMP = {
    min: 18,
    max: 25
}

export const WEATHER_ICONS = {
    'Nice': '🤑',
    'Passable': '🙄',
    'Not Nice': '🤮',
    'Loading': '💀'
}

export const assignWeatherClass = (weather) => {
    const isNoRain = weather.precip_mm === 0;
    const isIdealTemp = weather.temperature >= IDEAL_TEMP.min &&
                        weather.temperature <= IDEAL_TEMP.max;

    if (isIdealTemp && isNoRain) {
        return 'Nice';
    }
    if (!isIdealTemp && !isNoRain) {
        return 'Not Nice';
    }
    return 'Passable';
};