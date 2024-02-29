import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { ApiProvider } from '@reduxjs/toolkit/query/react';

import WeatherSection from './features/weather/now/index.tsx';
import ForecastSection from './features/weather/forecast/index.tsx';
import PollutionSection from './features/weather/aqi/index.tsx';

import { DefaultSection, ErrorSection } from './features/sections/index.tsx';


import Root from './app/Root.tsx';
import { store } from './app/store.ts';
import { api } from './features/api/apiSlice.ts';

const router = createBrowserRouter([
    {
        path: '',
        element: <Navigate to='/weather/' replace={true}/>
    },
    {
        path: '/',
        element: <Root />,
        children: 
        [
            {
                errorElement: <ErrorSection />,
                children: 
                [
                    {
                        path: 'weather/:city',
                        element: <WeatherSection />,
                        loader: async ({ params }) => {
                            const coordinatesPromise = store.dispatch(api.endpoints.getCoordinates.initiate({city: params.city, limit: 1}));
                            coordinatesPromise.unsubscribe();
                            const {data: coordinateData} = await coordinatesPromise;

                            const weatherPromise = store.dispatch(api.endpoints.getCurrentWeather.initiate({lat: coordinateData[0].lat, long: coordinateData[0].lon}));
                            weatherPromise.unsubscribe();
                            const {data: weatherData} = await weatherPromise;

                            return {...weatherData, providedName: params.city};
                        }
                    },
                    {
                        path: 'forecast/:city',
                        element: <ForecastSection />,
                        loader: async ({ params }) => {
                            const coordinatesPromise = store.dispatch(api.endpoints.getCoordinates.initiate({city: params.city, limit: 1}));
                            coordinatesPromise.unsubscribe();
                            const {data: coordinateData} = await coordinatesPromise;

                            const weatherPromise = store.dispatch(api.endpoints.getForecastWeather.initiate({lat: coordinateData[0].lat, long: coordinateData[0].lon}));
                            weatherPromise.unsubscribe();
                            const {data: weatherData} = await weatherPromise;

                            return {...weatherData, providedName: params.city};
                        }
                    },
                    {
                        path: 'air_pollution/:city',
                        element: <PollutionSection />,
                        loader: async ({ params }) => {
                            const coordinatesPromise = store.dispatch(api.endpoints.getCoordinates.initiate({city: params.city, limit: 1}));
                            coordinatesPromise.unsubscribe();
                            const {data: coordinateData} = await coordinatesPromise;

                            const weatherPromise = store.dispatch(api.endpoints.getPollutionData.initiate({lat: coordinateData[0].lat, long: coordinateData[0].lon}));
                            weatherPromise.unsubscribe();
                            const {data: weatherData} = await weatherPromise;

                            return {...weatherData, providedName: params.city};
                        }
                    },
                ],
            },
            {
                path: '*',
                element: <DefaultSection />,
            },
        ],
    },
]);

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <ApiProvider api={api}>
        <RouterProvider router={router} />
    </ApiProvider>
);
