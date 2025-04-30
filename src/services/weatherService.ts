import axios from 'axios';
import { CurrentWeather, Forecast } from '../types/weather';
import { WEATHER_API } from '../constants/weather';

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || "df98d3e3a716818c1f4faa121906db1d";

const weatherApi = axios.create({
  baseURL: WEATHER_API.BASE_URL,
  params: {
    appid: API_KEY,
    units: WEATHER_API.UNITS,
    lang: WEATHER_API.LANG,
  },
});

export const getCurrentWeather = async (city: string): Promise<CurrentWeather> => {
  const { data } = await weatherApi.get<CurrentWeather>('/weather', {
    params: { q: city },
  });
  return data;
};

export const getForecast = async (city: string): Promise<Forecast> => {
  const { data } = await weatherApi.get<Forecast>('/forecast', {
    params: { q: city },
  });
  return data;
}; 