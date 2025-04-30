import { useWeatherStore } from '../store/weatherStore';
import Link from 'next/link';
import { ROUTES, UI_TEXT } from '../constants/weather';

export const CurrentWeather = () => {
  const { currentWeather, loading, error, addFavoriteCity, favoriteCities } = useWeatherStore();

  if (loading) {
    return <div className="text-center">{UI_TEXT.LOADING}</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!currentWeather) {
    return null;
  }

  const isFavorite = favoriteCities.includes(currentWeather.name);

  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="card-title">
            {currentWeather.name}, {currentWeather.sys.country}
          </h2>
          <div>
            <Link href={ROUTES.FORECAST} className="btn btn-info me-2">
              {UI_TEXT.DETAILED_FORECAST}
            </Link>
            <button
              className={`btn ${isFavorite ? 'btn-warning' : 'btn-outline-warning'}`}
              onClick={() => addFavoriteCity(currentWeather.name)}
              disabled={isFavorite}
            >
              {isFavorite ? UI_TEXT.IN_FAVORITES : UI_TEXT.ADD_TO_FAVORITES}
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <h3 className="display-4">
              {Math.round(currentWeather.main.temp)}°C
            </h3>
            <p className="lead">
              {currentWeather.weather[0].description}
            </p>
          </div>
          <div className="col-md-6">
            <ul className="list-unstyled">
              <li>{UI_TEXT.FEELS_LIKE}: {Math.round(currentWeather.main.feels_like)}°C</li>
              <li>{UI_TEXT.HUMIDITY}: {currentWeather.main.humidity}%</li>
              <li>{UI_TEXT.PRESSURE}: {currentWeather.main.pressure} hPa</li>
              <li>{UI_TEXT.WIND}: {currentWeather.wind.speed} м/с</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}; 