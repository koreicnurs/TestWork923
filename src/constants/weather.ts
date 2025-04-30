export const WEATHER_API = {
  BASE_URL: 'https://api.openweathermap.org/data/2.5',
  ICON_URL: 'http://openweathermap.org/img/wn',
  UNITS: 'metric',
  LANG: 'ru',
};

export const ROUTES = {
  HOME: '/',
  FORECAST: '/forecast',
};

export const STORAGE_KEYS = {
  WEATHER: 'weather-storage',
};

export const ERROR_MESSAGES = {
  CITY_NOT_FOUND: 'Город не найден. Пожалуйста, проверьте название и попробуйте снова.',
  WEATHER_LOAD_ERROR: 'Ошибка при загрузке данных о погоде',
};

export const UI_TEXT = {
  LOADING: 'Загрузка...',
  SEARCH_PLACEHOLDER: 'Введите название города',
  SEARCH_BUTTON: 'Поиск',
  BACK_BUTTON: 'Назад',
  DETAILED_FORECAST: 'Детальный прогноз',
  ADD_TO_FAVORITES: 'Добавить в избранное',
  IN_FAVORITES: 'В избранном',
  FEELS_LIKE: 'Ощущается как',
  HUMIDITY: 'Влажность',
  PRESSURE: 'Давление',
  WIND: 'Ветер',
  NO_FAVORITES: 'У вас пока нет избранных городов. Добавьте их, чтобы быстро получать информацию о погоде.',
  VIEW_WEATHER: 'Посмотреть погоду',
  REMOVE: 'Удалить',
  FIVE_DAY_FORECAST: 'Прогноз на 5 дней',
  DETAILED_WEATHER_FORECAST: 'Детальный прогноз погоды',
}; 