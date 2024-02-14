import Navbar from './Navbar';
import { LoaderSection, ErrorSection, DefaultSection } from './InfoSections';
import WeatherSection from './WeatherSection';
import ForecastSection from './ForecastSection';

import { Fragment, useEffect, useState } from 'react';

type menuOption = 'weather' | 'forecast' | 'air_pollution';
type CityData = {coords: {lat: string, long: string}, name?: string};

const weatherTitles = ['asking the weather gods', 'checking the weather stone', 'looking out the window'];


//TODO: Setup reducers and context for easier state management

export default function Main() {
    const [weatherData, setWeatherData] = useState(null);
    const [selectedMenu, setSelectedMenu] = useState('forecast' as menuOption);
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const openweatherURL = new URL(`https://api.openweathermap.org/data/2.5/${selectedMenu}?units=metric&appid=8eb16d0f89f9abb9566d44e84d13627f`);

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
        fetch(openweatherURL.toString())
            .then((response) => {
                if(!response.ok)
                    throw new Error(response.status.toString() + ': city weather unavailable');
                return response.json();
            })
            .then((responseData) => {
                if(city.name)
                    setWeatherData({...responseData, providedName: city.name});
                else 
                    setWeatherData({...responseData});
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
            
            { error && <ErrorSection message={error} /> }

            { isLoading ? (
                <LoaderSection message={weatherTitles[Math.floor(Math.random() * 3)]} />
            ) : (
                weatherData === null ? (
                    <DefaultSection />
                ) : (
                    (selectedMenu === 'weather' && <WeatherSection weatherData={weatherData} />) ||
                    (selectedMenu === 'forecast' && <ForecastSection weatherData={weatherData}/>)
                )
            )}
        </Fragment>
    );
}
