

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