import { useCallback, useEffect, useState } from 'react';
import { useWeatherStore } from '../store/weatherStore';
import { getCurrentWeather, getForecast } from '../services/weatherService';
import { ERROR_MESSAGES, UI_TEXT, WEATHER_API } from '../constants/weather';
import { CurrentWeather } from '../types/weather';

interface CityWeather {
  [key: string]: CurrentWeather;
}

export const FavoriteCities = () => {
  const { favoriteCities, removeFavoriteCity, setCurrentWeather, setForecast, setLoading, setError } = useWeatherStore();
  const [citiesWeather, setCitiesWeather] = useState<CityWeather>({});

  const fetchCityWeather = useCallback(async (city: string) => {
    try {
      const weather = await getCurrentWeather(city);
      setCitiesWeather(prev => ({ ...prev, [city]: weather }));
    } catch (error) {
      console.error(`Ошибка при загрузке погоды для ${city}:`, error);
    }
  }, []);

  useEffect(() => {
    favoriteCities.forEach(city => {
      fetchCityWeather(city);
    });
  }, [favoriteCities, fetchCityWeather]);

  const handleCityClick = useCallback(async (city: string) => {
    try {
      setLoading(true);
      setError(null);
      const [weather, forecast] = await Promise.all([
        getCurrentWeather(city),
        getForecast(city)
      ]);
      setCurrentWeather(weather);
      setForecast(forecast);
    } catch (error) {
      setError(ERROR_MESSAGES.WEATHER_LOAD_ERROR);
    } finally {
      setLoading(false);
    }
  }, [setCurrentWeather, setForecast, setLoading, setError]);

  if (favoriteCities.length === 0) {
    return (
      <div className="alert alert-info">
        {UI_TEXT.NO_FAVORITES}
      </div>
    );
  }

  return (
    <div className="mt-4">
      <h3>{UI_TEXT.FIVE_DAY_FORECAST}</h3>
      <div className="row">
        {favoriteCities.map((city) => {
          const weather = citiesWeather[city];
          return (
            <div key={city} className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="card-title mb-0">{city}</h5>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => removeFavoriteCity(city)}
                    >
                      {UI_TEXT.REMOVE}
                    </button>
                  </div>
                  {weather && (
                    <div className="mt-3">
                      <div className="d-flex align-items-center mb-2">
                        <img
                          src={`${WEATHER_API.ICON_URL}/${weather.weather[0].icon}@2x.png`}
                          alt={weather.weather[0].description}
                          width="40"
                          height="40"
                          className="me-2"
                        />
                        <div>
                          <h6 className="mb-0">{Math.round(weather.main.temp)}°C</h6>
                          <small>{weather.weather[0].description}</small>
                        </div>
                      </div>
                      <div className="small text-muted">
                        <div>{UI_TEXT.FEELS_LIKE}: {Math.round(weather.main.feels_like)}°C</div>
                        <div>{UI_TEXT.HUMIDITY}: {weather.main.humidity}%</div>
                      </div>
                    </div>
                  )}
                  <button
                    className="btn btn-link p-0 mt-2"
                    onClick={() => handleCityClick(city)}
                  >
                    {UI_TEXT.VIEW_WEATHER}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}; 