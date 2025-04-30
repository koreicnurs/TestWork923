import { useState, useCallback } from 'react';
import { useWeatherStore } from '../store/weatherStore';
import { getCurrentWeather, getForecast } from '../services/weatherService';
import { ERROR_MESSAGES, UI_TEXT } from '../constants/weather';

export const SearchBar = () => {
  const [city, setCity] = useState('');
  const { setCurrentWeather, setForecast, setLoading, setError } = useWeatherStore();

  const handleSearch = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim()) return;

    try {
      setLoading(true);
      setError(null);
      const [weather, forecast] = await Promise.all([
        getCurrentWeather(city),
        getForecast(city),
      ]);
      setCurrentWeather(weather);
      setForecast(forecast);
    } catch (error) {
      setError(ERROR_MESSAGES.CITY_NOT_FOUND);
    } finally {
      setLoading(false);
    }
  }, [city, setCurrentWeather, setForecast, setLoading, setError]);

  return (
    <form onSubmit={handleSearch} className="mb-4">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder={UI_TEXT.SEARCH_PLACEHOLDER}
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">
          {UI_TEXT.SEARCH_BUTTON}
        </button>
      </div>
    </form>
  );
}; 