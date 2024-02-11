import './stylesheets/forecastsection.css';

import Section from './Section';


export default function ForecastSection({ weatherData }): JSX.Element{
    return (
        <Section type='default' title={weatherData.city.name.toLocaleLowerCase() + ', ' + weatherData.city.country}>
            <></>
        </Section>
    );
}
