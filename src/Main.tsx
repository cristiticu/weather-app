import WeatherSection from './WeatherSection';
import ForecastSection from './ForecastSection';

import Navbar from './Navbar';
import Section from './Section';
import Loader from './Loader';

import { Fragment, useEffect, useState } from 'react';

const openweatherURL = new URL('https://api.openweathermap.org/data/2.5/weather?units=metric&appid=8eb16d0f89f9abb9566d44e84d13627f');

type menuOption = 'weatherNow' | 'weatherForecast' | 'aqi';
type CityData = {coords: {lat: string, long: string}, name?: string};

const weatherTitles = ['asking the weather gods', 'checking the weather stone', 'looking out the window'];


//TODO: Setup reducers and context for easier state management

export default function Main(): JSX.Element{
    const [weatherData, setWeatherData] = useState(null);
    const [selectedMenu, setSelectedMenu]: [s: menuOption, ss: (s: menuOption) => void] = useState('weatherNow' as menuOption);
    const [isLoading, setIsLoading]: [l: boolean, sl: (l: boolean) => void] = useState(false);
    const [error, setError]: [e: string, se: (e: string) => void] = useState(null);


    useEffect(() => {
        if(!navigator.geolocation)
            setError('geolocation unavailable. search for a city instead');
        else{
            setIsLoading(true);
            navigator.geolocation.getCurrentPosition((position) => {
                const positionData = {coords: {lat: position.coords.latitude.toString(), long: position.coords.longitude.toString()}};
                handleCityChanged(positionData);
            }, (error) => {
                setIsLoading(false);
                console.log(error);
            });
        }
    }, []);


    function handleCityChanged(city: CityData){
        setIsLoading(true);
        setError(null);
        setWeatherData(null);

        openweatherURL.searchParams.set('lat', city.coords.lat);
        openweatherURL.searchParams.set('lon', city.coords.long);
        // ^ COMMOn
        // v different
        fetch(openweatherURL.toString())
            .then((response) => {
                if(!response.ok)
                    throw new Error(response.status.toString() + ': city weather unavailable');
                return response.json();
            })
            .then((cityData) => { // v COMMON
                if(city.name)
                    setWeatherData({...cityData, name: city.name});
                else 
                    setWeatherData({...cityData});
            })
            .catch((error) => handleError(error))
            .finally(() => setIsLoading(false));
    }

    function handleError(error: Error): void{
        setError(error.message);
    }
    
    return (
        <Fragment>
            <Navbar searchDisabled={isLoading} 
                    onCitySubmitted={(cityData) => handleCityChanged(cityData)} 
                    onError={(error) => handleError(error)} />
            
            {error !== null && (
                <Section type='error' title={error}>
                    {null}
                </Section>
            )}

            {isLoading ? (
                <Section type='loading' title={weatherTitles[Math.floor(Math.random() * 3)]}>
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
                    (selectedMenu === 'weatherNow' && <WeatherSection weatherData={weatherData} />) ||
                    (selectedMenu === 'weatherForecast' && <ForecastSection weatherData={weatherData}/>)
                )
            )}
        </Fragment>
    );
}
