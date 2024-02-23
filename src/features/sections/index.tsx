import './section.css';
import './loader.css';
import { useRouteError } from 'react-router-dom';


/**
 * Component that will wrap something in a section. It is basic and the base for every other component used so far
 * @param props a title and the children to be wrapped. The title will be on top
 * @returns the children wrapped in a div with a 'section' class
 */
export function Section({ title, type, children }: {title: string, type: 'default' | 'error' | 'loading', children: JSX.Element | JSX.Element[]}) {
    return(
        <div className={"section " + type}>
            <span className="section-title">{title}</span>
            {children}
        </div>
    );
}


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
export function ErrorSection(): JSX.Element{
    const error = useRouteError() as Error;
    return (
        <Section type='error' title={error.message}>
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

