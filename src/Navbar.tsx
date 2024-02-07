import './stylesheets/navbar.css'

import { useState } from 'react';


//const citySuggestionsURL = new URL('https://secure.geonames.org/searchJSON?q=cluj-napoca&fuzzy=0.7&maxRows=4&username=nicko454g&featureClass=P');
const citySuggestionsURL = new URL('https://secure.geonames.org/searchJSON?q=suce&fuzzy=0.7&maxRows=4&username=nicko454g&featureCode=PPLA&featureCode=PPLA2&featureCode=PPLC&featureCode=PPLS&featureCode=PPL');
//const citySuggestionsURL = new URL('https://secure.geonames.org/searchJSON?q=suce&fuzzy=0.7&maxRows=4&username=nicko454g&featureCode=PPL');


/**
 * Debounced function factory. On a given function toDebounce, returns a 'debounced' function that 
 * can be called many times in quick succesion, but will run only once, specifically
 * after 'time' miliseconds
 * @param toDebounce the function to debounce
 * @param time the number of milliseconds to wait for more calls
 * @returns a debounced version of the given function (a closure over the function 'toDebounce')
 */
function debounce(toDebounce: Function, time: number = 600): Function {
    let timer: number;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            toDebounce.apply(this, args);
        }, time);
    };
}



export default function Navbar({ onCitySubmitted, onError }){
    const [suggestions, setSuggestions] = useState(null);

    const handleCityChanged = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        citySuggestionsURL.searchParams.set('q', e.target.value);
        if(e.target.value.length >= 3)
            fetch(citySuggestionsURL.toString())
            .then((response) => response.json()
            .then((newSuggestions) => {
                setSuggestions(newSuggestions.geonames.map(newSuggestion => {
                    return {name: newSuggestion.name, country: newSuggestion.countryName, coords: {lat: Number.parseFloat(newSuggestion.lat), long: Number.parseFloat(newSuggestion.lng)}};
                }));
            }))
            .catch((error) => onError(error));
        else
            setSuggestions(null);
    }, 600);

    function handleCitySubmit(e){
        onCitySubmitted(suggestions[e.target.value].name);
        setSuggestions(null);
    }
    
    return (
        <div className="navbar">
            <span className="title unselectable">weather.net</span>
            <div className="search-wrapper">
                <input className="search-bar" type="search" placeholder="search your city" onChange={(e) => handleCityChanged(e)} />
                {suggestions &&
                <div className="suggestions">
                    <ul>
                        {suggestions.map((suggestion, index) => {
                            if(suggestion)
                                return (<li key={index}>
                                        <button className="suggestion" value={index} onClick={(e) => handleCitySubmit(e)}>{suggestion.name + ', ' + suggestion.country}</button>
                                        </li>);
                        })}
                    </ul>
                </div>}
            </div>
        </div>
    );
}
