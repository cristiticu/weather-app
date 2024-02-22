
export type MenuOption = 'weather' | 'forecast' | 'air_pollution';

export type CityData = {
    coords: {
        lat: string, 
        long: string}, 
    name?: string,
};

export type Coordinates  = {
    lat: string,
    long: string,
};

export type WeatherSuggestion = {
    name: string,
    country: string,
    coords: Coordinates,
}

export type RootProps = {
    cityHandler: (city: WeatherSuggestion) => void,
    menuHandler: (menu: MenuOption) => void,
    localizationHandler: () => void,
}

export type NavbarProps = { 
    searchDisabled: boolean, 
    onCitySubmitted: (city: WeatherSuggestion) => void, 
    onLocate: () => void,
    onError: (e: Error) => void,
}

export type MenuProps = {
    selectedMenu: MenuOption,
    menuDisabled: boolean,
    onMenuChanged: (menu: MenuOption) => void,
}

export type SuggestionsState = [s: WeatherSuggestion[], ss: (s: WeatherSuggestion) => void];
