import WeatherSection from './WeatherSection';
import Navbar from './Navbar'
import { Fragment, useState } from 'react';

const mockWeatherData = '{"coord":{"lon":23.6,"lat":46.7667},"weather":[{"id":801,"main":"Clouds","description":"few clouds","icon":"02d"}],"base":"stations","main":{"temp":11.82,"feels_like":10.68,"temp_min":11.71,"temp_max":13.81,"pressure":1010,"humidity":62},"visibility":10000,"wind":{"speed":12.96,"deg":270,"gust":18.33},"clouds":{"all":20},"dt":1707141479,"sys":{"type":1,"id":6913,"country":"RO","sunrise":1707111949,"sunset":1707147195},"timezone":7200,"id":681290,"name":"Cluj-Napoca","cod":200}';
const fakeWeatherData = JSON.parse(mockWeatherData);
const openweatherurl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=8eb16d0f89f9abb9566d44e84d13627f';

export default function Main(){
    const [weatherData, setWeatherData] = useState(fakeWeatherData);

    async function handleCityChanged(val){
        const newWeatherData = await fetch(openweatherurl + `&q=${val}`).then((response) => response.json());
        setWeatherData(newWeatherData);
    }
    
    return (
        <Fragment>
            <Navbar onCitySubmitted={(val) => handleCityChanged(val.target.value)} />
            <WeatherSection weatherData={weatherData}/>
        </Fragment>
    );
}
