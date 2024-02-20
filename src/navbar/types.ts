
export type Coordinates  = {
    lat: string,
    long: string,
};

export type WeatherSuggestion = {
    name: string,
    country: string,
    coords: Coordinates,
}

export type NavbarProps = { 
    searchDisabled: boolean, 
    onCitySubmitted: (c: WeatherSuggestion) => void, 
    onLocate: () => void,
    onError: (e: Error) => void,
}
