import './stylesheets/forecastsection.css';

import Section from './Section';
import { useState } from 'react';


/**
 * Utils function that will return the link for a specific openweather icon
 * @param status the status from the api response (eg: 20n)
 * @returns the appropiate link for the icon
 */
function getWeaterStatusLink(status: string) : string {
    return `https://openweathermap.org/img/wn/${status}@2x.png`;
}


export default function ForecastSection({ weatherData }): JSX.Element{
    const [forecastIndex, setForecastIndex]: [d: number, sd: (d: number) => void] = useState(0);
    const weekDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const todayIndex = (Math.floor(Number.parseInt(weatherData.list[0].dt) / 86400) + 3) % 7;

    const name = (weatherData.providedName ? weatherData.providedName : weatherData.city.name);
    
    const lostStamps = Number.parseInt(weatherData.list[0].dt_txt.split(' ')[1].split(':')[0]) / 3;
    let sliceStart = forecastIndex * 8 - lostStamps;
    
    if(sliceStart < 0)
        sliceStart = 0;

    return (
        <Section type='default' title={name.toLocaleLowerCase() + ', ' + weatherData.city.country.toLocaleLowerCase()}>
                <ul className='forecast'>
                    {weatherData.list.slice(sliceStart, sliceStart + 8).map((weatherElement, index) => {
                        const temp = Math.round(weatherElement.main.temp);
                        const hour = weatherElement.dt_txt.split(' ')[1].split(':')[0];

                        return (
                            <li key={index} className='forecastElement'>
                                <ul>
                                    <li>{(index === 0 && forecastIndex === 0) ? 'Now' : hour}</li>
                                    <li><img src={getWeaterStatusLink(weatherElement.weather[0].icon)} /></li>
                                    <li>{temp}°</li>
                                </ul>
                            </li>
                        );
                    })}
                </ul>
                <button className='weekday' disabled={forecastIndex === 0} onClick={() => setForecastIndex(0)}>today</button>
                <button className='weekday' disabled={forecastIndex === 1} onClick={() => setForecastIndex(1)}>{weekDays[(todayIndex + 1) % 7]}</button>
                <button className='weekday' disabled={forecastIndex === 2} onClick={() => setForecastIndex(2)}>{weekDays[(todayIndex + 2) % 7]}</button>
                <button className='weekday' disabled={forecastIndex === 3} onClick={() => setForecastIndex(3)}>{weekDays[(todayIndex + 3) % 7]}</button>
                <button className='weekday' disabled={forecastIndex === 4} onClick={() => setForecastIndex(4)}>{weekDays[(todayIndex + 4) % 7]}</button>
        </Section>
    );
}
