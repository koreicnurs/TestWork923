import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CurrentWeather, Forecast } from '../types/weather';
import { STORAGE_KEYS } from '../constants/weather';

interface WeatherState {
  currentWeather: CurrentWeather | null;
  forecast: Forecast | null;
  favoriteCities: string[];
  loading: boolean;
  error: string | null;
}

interface WeatherActions {
  setCurrentWeather: (weather: CurrentWeather) => void;
  setForecast: (forecast: Forecast) => void;
  addFavoriteCity: (city: string) => void;
  removeFavoriteCity: (city: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

type WeatherStore = WeatherState & WeatherActions;

const initialState: WeatherState = {
  currentWeather: null,
  forecast: null,
  favoriteCities: [],
  loading: false,
  error: null,
};

export const useWeatherStore = create<WeatherStore>()(
  persist(
    (set) => ({
      ...initialState,
      setCurrentWeather: (weather) => set({ currentWeather: weather }),
      setForecast: (forecast) => set({ forecast }),
      addFavoriteCity: (city) =>
        set((state) => ({
          favoriteCities: [...state.favoriteCities, city],
        })),
      removeFavoriteCity: (city) =>
        set((state) => ({
          favoriteCities: state.favoriteCities.filter((c) => c !== city),
        })),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
    }),
    {
      name: STORAGE_KEYS.WEATHER,
    }
  )
); 