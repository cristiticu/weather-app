import WeatherSection from './WeatherSection';
import Navbar from './Navbar';
import Section from './Section';
import Loader from './Loader';
import { Fragment, useEffect, useState } from 'react';

const openweatherURL = new URL('https://api.openweathermap.org/data/2.5/weather?units=metric&appid=8eb16d0f89f9abb9566d44e84d13627f');

type menuOption = 'weatherNow' | 'weatherForecast' | 'aqi';

const weatherTitles = ['asking the weather gods', 'checking the weather stone', 'looking out the window'];


export default function Main(){
    const [weatherData, setWeatherData] = useState(null);
    const [selectedMenu, setSelectedMenu] = useState('weatherNow');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
        console.log("Loaded");
    }, []);


    function handleCityChanged(city){
        setIsLoading(true);
        
        setError(null);
        setWeatherData(null);

        openweatherURL.searchParams.set('lat', city.coords.lat);
        openweatherURL.searchParams.set('lon', city.coords.long);
        
        fetch(openweatherURL.toString())
            .then((response) => {
                if(!response.ok)
                    throw new Error(response.status.toString() + ': city weather unavailable');
                return response.json();
            })
            .then((cityData) => setWeatherData({...cityData, name: city.name}))
            .catch((error) => handleError(error))
            .finally(() => setIsLoading(false));
    }

    function handleError(error){
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
                <Section type='default' title={weatherTitles[Math.floor(Math.random() * 3)]}>
                    <br />
                    <Loader />
                </Section>
            ) : (
                weatherData === null ? (
                    <Section type='default' title='no city selected'>
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
