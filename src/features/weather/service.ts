/**
 * Utils function that will return the link for a specific openweather icon
 * @param status the status from the api response (eg: 20n)
 * @returns the appropiate link for the icon
 */
export function getWeaterStatusLink(status: string) : string {
    return `https://openweathermap.org/img/wn/${status}@2x.png`;
}
