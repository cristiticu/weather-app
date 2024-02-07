import WeatherSection from './WeatherSection';
import Navbar from './Navbar'
import Section from './Section'
import { Fragment, useState } from 'react';

const openweatherurl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=8eb16d0f89f9abb9566d44e84d13627f';

type menuOption = 'weatherNow' | 'weatherForecast' | 'aqi';


export default function Main(){
    const [weatherData, setWeatherData] = useState(null);
    const [selectedMenu, setSelectedMenu] = useState('weatherNow');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    function handleCityChanged(cityName){
        setIsLoading(true);
        setError(null);
        setWeatherData(null);
        
        fetch(openweatherurl + `&q=${cityName}`)
            .then((response) => {
                if(!response.ok)
                    throw new Error(response.status.toString() + ': City weather unavailable');
                return response.json();
            })
            .then((cityData) =>setWeatherData(cityData))
            .catch((error) => setError(error.message))
            .finally(() => setIsLoading(false));
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
            {isLoading ? (
                <span>LOADING</span>
            ) : (
                weatherData === null ? (
                    <Section type='default' title="no city selected">
                        <br />
                        <br />
                        <span>
                            search for a city or allow localization 
                        </span>
                    </Section>
                ) : (
                    <WeatherSection weatherData={weatherData}/>
                )
            )}
        </Fragment>
    );
}
