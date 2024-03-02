import './weathersection.css';

import { Section } from '../../sections';
import { useLoaderData } from 'react-router-dom';

/**
 * Utils function that will return the link for a specific openweather icon
 * @param status the status from the api response (eg: 20n)
 * @returns the appropiate link for the icon
 */
function getWeaterStatusLink(status: string): string {
	return `https://openweathermap.org/img/wn/${status}@2x.png`;
}

/**
 * Component with the main weather information such as degrees, windspeed and humidity
 * @param props the weather data
 * @returns
 */
export default function WeatherSection() {
	const weatherData = useLoaderData() as any;

	const windSpeed = weatherData.wind.speed * 3.6; // Converting m/s to km/h
	const windAngleIndex = Math.floor(((weatherData.wind.deg + 45) % 360) / 90); // Calculating direction from angle: a 45 degree
	// offset divided by 90 degrees / direction giving the index
	const windAngles = ['north', 'east', 'south', 'west'];
	const windSpeedDescriptions = [
		'still winds',
		'light winds',
		'light breeze',
		'gentle breeze',
		'fresh breeze',
		'strong breeze',
		'moderate gale',
		'fresh gale',
		'strong gale',
		'storm',
		'hurricane',
	];
	const windSpeedIndex = Math.floor((windSpeed > 100 ? 100 : windSpeed) / 10);

	const name = weatherData.providedName ? weatherData.providedName : weatherData.name;

	return (
		<Section
			type='default'
			title={name.toLocaleLowerCase() + ', ' + weatherData.sys.country.toLocaleLowerCase()}>
			<ul className='weather-list'>
				<li className='weather-data important-data'>
					<img src={getWeaterStatusLink(weatherData.weather[0].icon)} />
					{Math.round(weatherData.main.temp)}°
				</li>
				<li className='weather-data'>
					feels like {Math.round(weatherData.main.feels_like)}°,{' '}
					{weatherData.weather[0].description}
				</li>
				<li className='weather-data'>
					{windSpeedDescriptions[windSpeedIndex]} from {windAngles[windAngleIndex]} at{' '}
					{Math.round(windSpeed)} km/h
				</li>
				<li className='weather-data'>{weatherData.main.humidity}% humidity</li>
			</ul>
		</Section>
	);
}
