import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import WeatherSection from './WeatherSection';

const mockWeatherData = '{"coord":{"lon":18.4232,"lat":-33.9258},"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03d"}],"base":"stations","main":{"temp":25.26,"feels_like":25.75,"temp_min":22.55,"temp_max":26.73,"pressure":1015,"humidity":73},"visibility":10000,"wind":{"speed":7.2,"deg":320},"clouds":{"all":40},"dt":1707129995,"sys":{"type":2,"id":2073005,"country":"ZA","sunrise":1707106272,"sunset":1707155358},"timezone":7200,"id":3369157,"name":"Cape Town","cod":200}';
const weatherData = JSON.parse(mockWeatherData);

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <StrictMode>
        <WeatherSection weatherData={weatherData}/>
    </StrictMode>
);
