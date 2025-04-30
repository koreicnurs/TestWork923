import { useWeatherStore } from '../store/weatherStore';

export const WeatherForecast = () => {
  const { forecast, loading } = useWeatherStore();

  if (loading || !forecast) {
    return null;
  }

  const dailyForecast = forecast.list.reduce((acc: any, item: any) => {
    const date = new Date(item.dt * 1000);
    const dateKey = date.toLocaleDateString();
    
    if (!acc[dateKey] || date.getHours() === 12) {
      acc[dateKey] = item;
    }
    return acc;
  }, {});

  const sortedDates = Object.keys(dailyForecast).sort((a, b) => 
    new Date(a).getTime() - new Date(b).getTime()
  );

  const nextFiveDays = sortedDates.slice(0, 5);

  return (
    <div className="mt-4">
      <h3>Прогноз на 5 дней</h3>
      <div className="row">
        {nextFiveDays.map((date) => {
          const item = dailyForecast[date];
          const forecastDate = new Date(item.dt * 1000);
          
          return (
            <div key={date} className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">
                    {forecastDate.toLocaleDateString('ru-RU', { 
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long'
                    })}
                  </h5>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-0">
                        {Math.round(item.main.temp)}°C
                      </h6>
                      <small>{item.weather[0].description}</small>
                    </div>
                    <div>
                      <small>Ветер: {item.wind.speed} м/с</small>
                      <br />
                      <small>Влажность: {item.main.humidity}%</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}; 