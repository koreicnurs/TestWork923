export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

export interface Wind {
  speed: number;
  deg: number;
}

export interface City {
  id: number;
  name: string;
  country: string;
  coord: {
    lat: number;
    lon: number;
  };
}

export interface CurrentWeather {
  weather: Weather[];
  main: Main;
  wind: Wind;
  dt: number;
  name: string;
  sys: {
    country: string;
  };
}

export interface ForecastItem {
  dt: number;
  main: Main;
  weather: Weather[];
  wind: Wind;
}

export interface Forecast {
  list: ForecastItem[];
  city: City;
} 