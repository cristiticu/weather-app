import { MenuOption } from "../types";

/**
 * Utils function that will return the link for a specific openweather icon
 * @param status the status from the api response (eg: 20n)
 * @returns the appropiate link for the icon
 */
export function getWeaterStatusLink(status: string) : string {
    return `https://openweathermap.org/img/wn/${status}@2x.png`;
}


/**
 * Fetcher function for use in the Router Loader function. Currently the same fetcher is used for all three components, maybe separate? (?)
 * @param menu the menu selected, so we can fetch from the correct endpoint
 * @param city the city to be fetched
 * @returns data relevant to the menu and city selected
 */
export async function fetchData(menu: MenuOption, city: string) {
    const locationResponse = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=8eb16d0f89f9abb9566d44e84d13627f`);
    if(!locationResponse.ok)
        throw new Error(locationResponse.status.toString() + ': suggestions unavailable');
    const locationData = await locationResponse.json();

    const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/${menu}?lat=${locationData[0].lat}&lon=${locationData[0].lon}&units=metric&appid=8eb16d0f89f9abb9566d44e84d13627f`);
    if(!weatherResponse.ok)
        throw new Error(weatherResponse.status.toString() + ': city weather unavailable');
    const weatherData = await weatherResponse.json();
        
    return {...weatherData, providedName: city};
}
