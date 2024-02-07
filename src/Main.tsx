import WeatherSection from './WeatherSection';
import Navbar from './Navbar'
import Section from './Section'
import { Fragment, useState } from 'react';

const mockWeatherData = '{"coord":{"lon":23.6,"lat":46.7667},"weather":[{"id":801,"main":"Clouds","description":"few clouds","icon":"02d"}],"base":"stations","main":{"temp":11.82,"feels_like":10.68,"temp_min":11.71,"temp_max":13.81,"pressure":1010,"humidity":62},"visibility":10000,"wind":{"speed":12.96,"deg":270,"gust":18.33},"clouds":{"all":20},"dt":1707141479,"sys":{"type":1,"id":6913,"country":"RO","sunrise":1707111949,"sunset":1707147195},"timezone":7200,"id":681290,"name":"Cluj-Napoca","cod":200}';
const fakeWeatherData = JSON.parse(mockWeatherData);
const openweatherurl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=8eb16d0f89f9abb9566d44e84d13627f';

type menuOption = 'weatherNow' | 'weatherForecast' | 'aqi';


export default function Main(){
    const [weatherData, setWeatherData] = useState(null);
    const [selectedMenu, setSelectedMenu] = useState('weatherNow');
    const [error, setError] = useState(null);

    console.log(weatherData);

    function handleCityChanged(cityName){
        fetch(openweatherurl + `&q=${cityName}`)
            .then((response) => {
                if(!response.ok)
                    throw new Error(response.status.toString() + ': City weather unavailable');
                return response.json();
            })
            .then((cityData) => {
                setWeatherData(cityData);
                setError(null);
            })
            .catch((error) => {
                setWeatherData(null);
                setError(error.message);
            });
    }

    function handleError(error){
        setWeatherData(null);
        setError(error.message);
    }
    
    return (
        <Fragment>
            <Navbar onCitySubmitted={(cityData) => handleCityChanged(cityData)} onError={(error) => handleError(error)}/>
            {error !== null && (
                <Section type='error' title={error}>
                    {null}
                </Section>
            )}
            {weatherData === null ? (
                <Section type='default' title="no city selected">
                    <br />
                    <br />
                    <label>
                        search for a city or allow localization 
                    </label>
                </Section>
            ) : (
                <WeatherSection weatherData={weatherData}/>
            )}
        </Fragment>
    );
}
