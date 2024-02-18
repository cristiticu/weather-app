import Navbar from './Navbar';
import { LoaderSection, ErrorSection, DefaultSection } from './InfoSections';
import WeatherSection from './WeatherSection';
import ForecastSection from './ForecastSection';

import { Fragment, useEffect, useState, useRef } from 'react';

type MenuOption = 'weather' | 'forecast' | 'air_pollution';
type CityData = {coords: {lat: string, long: string}, name?: string};

const weatherTitles = ['asking the weather gods', 'checking the weather stone', 'looking out the window'];


export default function Main() {
    const weatherData = useRef(null);

    const [city, setCity] = useState(null);
    const [selectedMenu, setSelectedMenu] = useState('forecast' as MenuOption);
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

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

    async function fetchData(menu: MenuOption, city: CityData) {
        const openweatherURL = new URL(`https://api.openweathermap.org/data/2.5/${menu}?units=metric&appid=8eb16d0f89f9abb9566d44e84d13627f`);
        openweatherURL.searchParams.set('lat', city.coords.lat);
        openweatherURL.searchParams.set('lon', city.coords.long);
        
        return fetch(openweatherURL.toString())
            .then((response) => {
                if(!response.ok)
                    throw new Error(response.status.toString() + ': city weather unavailable');
                return response.json();
            });
    }


    function handleCityChanged(city: CityData) {
        setIsLoading(true);
        setError(null);

        fetchData(selectedMenu, city)
        .then((responseData) => {
            if(city.name)
                weatherData.current = {...responseData, providedName: city.name};
            else 
                weatherData.current = {...responseData};
            setCity(city);
        })
        .catch((error) => handleError(error))
        .finally(() => setIsLoading(false));
    }

    function handleMenuChanged(menu: MenuOption) {
        setIsLoading(true);
        setError(null);

        fetchData(menu, city)
        .then((responseData) => {
            if(city.name)
                weatherData.current = {...responseData, providedName: city.name};
            else 
                weatherData.current = {...responseData};
            setSelectedMenu(menu);
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
                weatherData.current === null ? (
                    <DefaultSection />
                ) : (
                    (selectedMenu === 'weather' && <WeatherSection weatherData={weatherData.current} />) ||
                    (selectedMenu === 'forecast' && <ForecastSection weatherData={weatherData.current}/>)
                )
            )}
            <button onClick={() => handleMenuChanged('weather')}>TEST</button>
        </Fragment>
    );
}
