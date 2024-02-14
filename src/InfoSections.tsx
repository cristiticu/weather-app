import './stylesheets/loader.css';

import Section from './Section';


/**
 * Component to show when the application is loading. Shows the provided message with a 'loading...' prompt
 * @param props message: what to show when loading, string 
 * @returns the loading component
 */
export function LoaderSection({ message }: { message: string}): JSX.Element{
    return (
        <Section type='loading' title={message}>
            <br />
            <div className="loader"></div>
        </Section>
    );
}

/**
 * Component to show when an error occured (usually used when openweather returns a 404)
 * @param props the error message, a string
 * @returns the error component
 */
export function ErrorSection({ message }: { message: string}): JSX.Element{
    return (
        <Section type='error' title={message}>
            {null}
        </Section>
    );
}

/**
 * A component to show when the city is not selected. Shows a basic default message
 * @returns the default component
 */
export function DefaultSection(): JSX.Element{
    return (
    <Section type='default' title='no city selected'>
        <br />
        <br />
        <span> search for a city or allow localization </span>
    </Section>
    );
}
