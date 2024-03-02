import { createRoot } from 'react-dom/client';

import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

import { ApiProvider } from '@reduxjs/toolkit/query/react';

import WeatherSection from './features/weather/now/index.tsx';
import ForecastSection from './features/weather/forecast/index.tsx';
import PollutionSection from './features/weather/aqi/index.tsx';

import { DefaultSection, ErrorSection } from './features/sections/index.tsx';

import Root from './app/Root.tsx';

import { weatherLoaderSelector } from './loaders.ts';

import { api } from './features/api/apiSlice.ts';

const router = createBrowserRouter([
	{
		path: '',
		element: (
			<Navigate
				to='/weather/'
				replace={true}
			/>
		),
	},
	{
		path: '/',
		element: <Root />,
		children: [
			{
				errorElement: <ErrorSection />,
				children: [
					{
						path: 'weather/:city',
						element: <WeatherSection />,
						loader: weatherLoaderSelector('weather'),
					},
					{
						path: 'forecast/:city',
						element: <ForecastSection />,
						loader: weatherLoaderSelector('forecast'),
					},
					{
						path: 'air_pollution/:city',
						element: <PollutionSection />,
						loader: weatherLoaderSelector('air_pollution'),
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
