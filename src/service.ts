import { MenuOption, WeatherSuggestion } from "./types.ts";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { fetchData } from "./weather/service.ts";
import MenuSelector from "./menu/index.tsx";


/**
 * Custom hook to enable navigation by city and weather state, for better ux
 * @returns a city handler and a menu handler
 */
export function useStateNavigation(){
    const [cityState, setCityState] = useState('');
    const [menuState, setMenuState] = useState('weather' as MenuOption);
    const navigate = useNavigate();

    function handleCityChanged(city: WeatherSuggestion){
        setCityState(city.name);
        navigate(`/${menuState}/${city.name}`);
    }

    function handleMenuChanged(menu: MenuOption){
        setMenuState(menu);
        navigate(`/${menu}/${cityState}`);
    }

    return {
        cityHandler: handleCityChanged,
        menuHandler: handleMenuChanged,
    };
}


/**
 * Custom hook to enable localization
 * @param cityHandler function delegated to change the city when localization finishes
 * @returns localization handler to be called whenever
 */
export function useLocalizationNavigation(cityHandler: Function){
    // useEffect(() => {
    //     handleLocalization();
    // }, []);

    function handleLocalization(){
        console.log('localizin');

        async function onSucces(position: GeolocationPosition){
            const response = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&limit=1&appid=8eb16d0f89f9abb9566d44e84d13627f`);
            const fetchedCity = await response.json();
            
            const positionData = {name: fetchedCity[0].name, country: fetchedCity[0].country, coords: {lat: position.coords.latitude.toString(), long: position.coords.longitude.toString()}};
            cityHandler(positionData);
        }

        function onError(error: GeolocationPositionError){
            console.error(error);
        }
        
        navigator.geolocation.getCurrentPosition(onSucces, onError);
    }

    return handleLocalization;
}
