import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

import Root from './Root.tsx';

import WeatherSection from './weather/now';
import ForecastSection from './weather/forecast/index.tsx';
import PollutionSection from './weather/aqi/index.tsx';

import { DefaultSection, ErrorSection } from './sections/index.tsx';

import { fetchData } from './weather/service.ts';

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
                            return await fetchData('weather', params.city);
                        }
                    },
                    {
                        path: 'forecast/:city',
                        element: <ForecastSection />,
                        loader: async ({ params }) => {
                            return await fetchData('forecast', params.city);
                        }
                    },
                    {
                        path: 'air_pollution/:city',
                        element: <PollutionSection />,
                        loader: async ({ params }) => {
                            return await fetchData('air_pollution', params.city);
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
    <RouterProvider router={router} />
);
