import './stylesheets/navbar.css';

import { useState } from 'react';


// Old suggestions URL using geonames.org. Too many problems, including wrong coordinates/city names.
//const citySuggestionsURL = new URL('https://secure.geonames.org/searchJSON?q=cluj-napoca&fuzzy=0.7&maxRows=4&username=nicko454g&featureClass=P');
//const citySuggestionsURL = new URL('https://secure.geonames.org/searchJSON?q=cluj-napoca&fuzzy=0.7&maxRows=4&username=nicko454g&featureCode=PPLA&featureCode=PPLA2&featureCode=PPLC&featureCode=PPLS&featureCode=PPL');
//const citySuggestionsURL = new URL('https://secure.geonames.org/searchJSON?q=cluj-napoca&fuzzy=0.7&maxRows=4&username=nicko454g&featureCode=PPL');

// New suggestions URL using geocoding by openweather. Will not give as many suggestions but it's more reliable
const citySuggestionsURL = new URL('https://api.openweathermap.org/geo/1.0/direct?q=cluj-napoca&limit=3&appid=8eb16d0f89f9abb9566d44e84d13627f');


interface Coordinates {
    lat: string,
    long: string
};

interface WeatherSuggestion {
    name: string,
    country: string,
    coords: Coordinates
}


/**
 * Debounced function factory. On a given function toDebounce, returns a 'debounced' function that 
 * can be called many times in quick succesion, but will run only once, specifically
 * after 'time' miliseconds
 * @param toDebounce the function to debounce
 * @param time the number of milliseconds to wait for more calls
 * @returns a debounced version of the given function (a closure over the function 'toDebounce')
 */
function debounce(toDebounce: Function, time: number = 600) {
    let timer: number;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            toDebounce.apply(this, args);
        }, time);
    };
}


/**
 * Component for the navbar on top of the page. It includes the title, the search bar and the search suggestions
 * provided by the geocoding API
 * @param props two handlers, one for submitting a city and one for handling errors on searching 
 * @returns the component
 */
export default function Navbar({ searchDisabled, onCitySubmitted, onError }: { searchDisabled: boolean, onCitySubmitted: (c: WeatherSuggestion) => void, onError: (e: Error) => void}) {
    const [suggestions, setSuggestions]: [s: WeatherSuggestion[], ss: (s: WeatherSuggestion) => void] = useState(null);


    // Closure for handling the search of citites. When an user types, it won't fire the fetch immediately,
    // instead it will wait 600ms for input, reseting on each letter typed
    const handleCityChanged = debounce((e) => {
        citySuggestionsURL.searchParams.set('q', e.target.value);

        if(e.target.value.length >= 3)
            fetch(citySuggestionsURL.toString())
            .then((response) => response.json()
            .then((newSuggestions) => {
                setSuggestions(newSuggestions.map(newSuggestion => {
                    return {name: newSuggestion.name.toLocaleLowerCase(), 
                            country: newSuggestion.country.toLocaleLowerCase(), 
                            coords: { lat: newSuggestion.lat, 
                                      long: newSuggestion.lon
                                    }
                            };
                }));
            }))
            .catch((error) => onError(error));
        else
            setSuggestions(null);
    }, 600);


    // Function for handling city submissions
    function handleCitySubmit(e) {
        onCitySubmitted(suggestions[e.target.value]);
        setSuggestions(null);
    }
    
    return (
        <div className="navbar">
            <span className="title unselectable">weather.net</span>
            <div className="search-wrapper">
                <input disabled={searchDisabled} id="citySearch" className="search-bar" type="search" placeholder="search your city" onChange={(e) => handleCityChanged(e)} />
                {suggestions &&
                <div className="suggestions">
                    <ul>
                        <li key={-1}>
                            <button className="suggestion">locate me</button>
                            <hr />
                        </li>
                        {suggestions.length !== 0 ? (
                            suggestions.map((suggestion, index) => {
                            if(suggestion)
                                return (<li key={index}>
                                        <button className="suggestion" value={index} onClick={(e) => handleCitySubmit(e)}>{suggestion.name + ', ' + suggestion.country}</button>
                                        </li>);
                        })) : (
                            <li key={-2}>
                                <span>no suggestions! try something else</span>
                            </li>
                        )}
                    </ul>
                </div>}
            </div>
        </div>
    );
}
