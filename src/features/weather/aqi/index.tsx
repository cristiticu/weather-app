import './pollutionsection.css';

import { Section } from '../../sections';
import { useLoaderData } from 'react-router-dom';


/**
 * 
 * @returns 
 */
export default function PollutionSection(){
    const pollutionData = useLoaderData() as any;

    const pollutionLevels = ['good', 'fair', 'moderate', 'poor', 'very poor'];

    const mainPollutionIndex = pollutionData.list[0].main.aqi - 1;
    const mainPollutionDescription = pollutionLevels[mainPollutionIndex];

    return (
        <Section type='default' title={pollutionData.providedName.toLocaleLowerCase()}>
            <ul className='pollutant-data'>
                <li className={'important-data l' + mainPollutionIndex}>
                    {mainPollutionDescription} quality
                </li>
                <li>pollutant concentration in μg/m<sup>3</sup></li>
                <div className='pollutants'>
                    <li className='polluttant-name'>so<sub>2</sub></li>
                    <li>{pollutionData.list[0].components.so2}</li>

                    <li className='polluttant-name'>no<sub>2</sub></li>
                    <li>{pollutionData.list[0].components.no2}</li>

                    <li className='polluttant-name'>pm<sub>10</sub></li>
                    <li>{pollutionData.list[0].components.pm10}</li>

                    <li className='polluttant-name'>pm<sub>2.5</sub></li>
                    <li>{pollutionData.list[0].components.pm2_5}</li>

                    <li className='polluttant-name'>o<sub>3</sub></li>
                    <li>{pollutionData.list[0].components.o3}</li>

                    <li className='polluttant-name'>co</li>
                    <li>{pollutionData.list[0].components.co}</li>
                </div>
            </ul>
        </Section>
    );
}
