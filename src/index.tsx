import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import WeatherSection from './WeatherSection';
import Navbar from './Navbar'

const mockWeatherData = '{"coord":{"lon":23.6,"lat":46.7667},"weather":[{"id":801,"main":"Clouds","description":"few clouds","icon":"02d"}],"base":"stations","main":{"temp":11.82,"feels_like":10.68,"temp_min":11.71,"temp_max":13.81,"pressure":1010,"humidity":62},"visibility":10000,"wind":{"speed":12.96,"deg":270,"gust":18.33},"clouds":{"all":20},"dt":1707141479,"sys":{"type":1,"id":6913,"country":"RO","sunrise":1707111949,"sunset":1707147195},"timezone":7200,"id":681290,"name":"Cluj-Napoca","cod":200}';
const weatherData = JSON.parse(mockWeatherData);

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <StrictMode>
        <Navbar onCitySubmitted={(val) => {console.log(val.target.value)}}/>
        <WeatherSection weatherData={weatherData}/>
    </StrictMode>
);
