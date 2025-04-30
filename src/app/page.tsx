'use client';

import { SearchBar } from '../components/SearchBar';
import { CurrentWeather } from '../components/CurrentWeather';
import { FavoriteCities } from '../components/FavoriteCities';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  return (
    <main className="container py-4">
      <h1 className="text-center mb-4">Прогноз погоды</h1>
      <SearchBar />
      <CurrentWeather />
      <FavoriteCities />
    </main>
  );
}
