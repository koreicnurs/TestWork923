'use client';

import { useWeatherStore } from '../../store/weatherStore';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ForecastPage() {
  const { forecast, loading } = useWeatherStore();

  if (loading || !forecast) {
    return (
      <div className="container py-4">
        <div className="text-center">Загрузка...</div>
      </div>
    );
  }

  const dailyForecast = forecast.list.reduce((acc: any, item: any) => {
    const date = new Date(item.dt * 1000);
    const dateKey = date.toLocaleDateString();
    
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(item);
    return acc;
  }, {});

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="mb-2">Детальный прогноз погоды</h1>
          <h4 className="text-muted">
            {forecast.city.name}, {forecast.city.country}
          </h4>
        </div>
        <Link href="/" className="btn btn-primary">
          Назад
        </Link>
      </div>

      {Object.entries(dailyForecast).map(([date, items]: [string, any]) => {
        const forecastDate = new Date(items[0].dt * 1000);
        
        return (
          <div key={date} className="card mb-4">
            <div className="card-header">
              <h3 className="mb-0">
                {forecastDate.toLocaleDateString('ru-RU', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long'
                })}
              </h3>
            </div>
            <div className="card-body">
              <div className="row">
                {items.map((item: any) => {
                  const time = new Date(item.dt * 1000);
                  return (
                    <div key={item.dt} className="col-md-3 mb-3">
                      <div className="card h-100">
                        <div className="card-body">
                          <h5 className="card-title">
                            {time.toLocaleTimeString('ru-RU', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </h5>
                          <div className="text-center mb-3">
                            <img
                              src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                              alt={item.weather[0].description}
                              width="50"
                              height="50"
                            />
                          </div>
                          <div className="text-center">
                            <h4>{Math.round(item.main.temp)}°C</h4>
                            <p className="mb-1">{item.weather[0].description}</p>
                            <small>Ощущается как: {Math.round(item.main.feels_like)}°C</small>
                          </div>
                          <div className="mt-3">
                            <small>Ветер: {item.wind.speed} м/с</small>
                            <br />
                            <small>Влажность: {item.main.humidity}%</small>
                            <br />
                            <small>Давление: {item.main.pressure} hPa</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
} 