import { Coordinates } from "../types";

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'
import { configureStore } from '@reduxjs/toolkit'



export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.openweathermap.org/',
    }),
    endpoints: (builder) => ({
        getCoordinates: builder.query({
            query: (params: {city: string, limit: number}) => `geo/1.0/direct?q=${params.city}&limit=${params.limit}&appid=8eb16d0f89f9abb9566d44e84d13627f`
        }),
        getCurrentWeather: builder.query({
            query: (coordinates: Coordinates) => `data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.long}&units=metric&appid=8eb16d0f89f9abb9566d44e84d13627f`
        }),
        getForecastWeather: builder.query({
            query: (coordinates: Coordinates) => `data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.long}&units=metric&appid=8eb16d0f89f9abb9566d44e84d13627f`
        }),
        getPollutionData: builder.query({
            query: (coordinates: Coordinates) => `data/2.5/air_pollution?lat=${coordinates.lat}&lon=${coordinates.long}&units=metric&appid=8eb16d0f89f9abb9566d44e84d13627f`
        }),
    }),
});

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});