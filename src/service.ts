import { MenuOption, WeatherSuggestion } from "./types.ts";

import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";


/**
 * Custom hook to enable navigation, keeping in mind the current URL, to simulate state
 * @returns a city handler and a menu handler
 */
export function useStateNavigation(){
    const navigate = useNavigate();
    const location = useLocation();

    const splitURL = location.pathname.split('/', 3);

    const currentMenu: string = splitURL[1];
    const currentCity: string = splitURL[2];

    function handleCityChanged(city: WeatherSuggestion){
        navigate(`/${currentMenu}/${city.name}`);
    }

    function handleMenuChanged(menu: MenuOption){
        navigate(`/${menu}/${currentCity}`);
    }

    return {
        currentURL: location.pathname,
        cityHandler: handleCityChanged,
        menuHandler: handleMenuChanged,
    };
}


/**
 * Custom hook to enable localization
 * @param cityHandler function delegated to change the city when localization finishes
 * @returns localization handler to be called whenever
 */
export function useLocalizationNavigation(currentURL: string, cityHandler: Function){
     useEffect(() => {
        if(currentURL.split('/')[2].length === 0){
            console.log('debug: localizing');
            handleLocalization();
        }
     }, [currentURL]);

    function handleLocalization(){
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
