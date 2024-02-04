import { Fragment } from 'react';

const mockWeatherData = '{"coord":{"lon":23.6,"lat":46.7667},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"base":"stations","main":{"temp":3.71,"feels_like":3.71,"temp_min":3.71,"temp_max":4.81,"pressure":1015,"humidity":87},"visibility":10000,"wind":{"speed":0.51,"deg":60},"clouds":{"all":0},"dt":1707072815,"sys":{"type":1,"id":6913,"country":"RO","sunrise":1707025629,"sunset":1707060703},"timezone":7200,"id":681290,"name":"Cluj-Napoca","cod":200}';
const weatherData = JSON.parse(mockWeatherData);

function getWeaterStatusLink(status: string) : string {
    return `https://openweathermap.org/img/wn/${status}@2x.png`;
}

export default function App(){
    const windSpeed = weatherData.wind.speed * 3.6; // Converting m/s to km/h
    const windAngleIndex = Math.floor((weatherData.wind.deg + 45) % 360 / 90); // Calculating direction from angle: a 45 degree 
                                                                               // offset divided by 90 degrees / direction giving the index
    const windAngles = ['North', 'East', 'South', 'West'];

    return (
        <Fragment>
            <label>hello, {weatherData.name.toLowerCase()}!</label>
            <ul className="weather-list">
                <li className="weather-data">
                    <img src={getWeaterStatusLink(weatherData.weather[0].icon)} />
                    {Math.round(weatherData.main.temp)}°, {weatherData.weather[0].description}
                </li>
                <li className="weather-data">
                    feels like {Math.round(weatherData.main.feels_like)}°
                </li>
                <li className="weather-data">
                    from {windAngles[windAngleIndex]}, {windSpeed} km/h
                </li>
                <li className="weather-data">
                    {weatherData.main.humidity}%
                </li>
            </ul>
        </Fragment>
    );
}