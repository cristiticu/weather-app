import { store } from './app/store';
import { api } from './features/api/apiSlice';
import { MenuOption } from './types';

export function weatherLoaderSelector(option: MenuOption) {
	let endpoint: string;
	switch (option) {
		case 'weather':
			endpoint = 'getCurrentWeather';
			break;
		case 'forecast':
			endpoint = 'getForecastWeather';
			break;
		case 'air_pollution':
			endpoint = 'getPollutionData';
			break;
		default:
			throw new Error('Invalid API endpoint selection');
	}

	return async ({ params }) => {
		const coordinatesPromise = store.dispatch(
			api.endpoints.getCoordinates.initiate({
				city: params.city,
				limit: 1,
			})
		);
		coordinatesPromise.unsubscribe();
		const { data: coordinateData } = await coordinatesPromise;

		const weatherPromise = store.dispatch(
			api.endpoints[endpoint].initiate({
				lat: coordinateData[0].lat,
				long: coordinateData[0].lon,
			})
		);
		weatherPromise.unsubscribe();
		const { data: weatherData } = await weatherPromise;

		return {
			...weatherData,
			providedName: params.city,
		};
	};
}
