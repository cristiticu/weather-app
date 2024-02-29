import { useState, useRef } from 'react';

import { SuggestionsState } from '../../types.ts';
import { useLazyGetCoordinatesQuery } from '../api/apiSlice.ts';

// Old suggestions URL using geonames.org. Too many problems, including wrong coordinates/city names.
//const citySuggestionsURL = new URL('https://secure.geonames.org/searchJSON?q=cluj-napoca&fuzzy=0.7&maxRows=4&username=nicko454g&featureClass=P');
//const citySuggestionsURL = new URL('https://secure.geonames.org/searchJSON?q=cluj-napoca&fuzzy=0.7&maxRows=4&username=nicko454g&featureCode=PPLA&featureCode=PPLA2&featureCode=PPLC&featureCode=PPLS&featureCode=PPL');
//const citySuggestionsURL = new URL('https://secure.geonames.org/searchJSON?q=cluj-napoca&fuzzy=0.7&maxRows=4&username=nicko454g&featureCode=PPL');

// New suggestions URL using geocoding by openweather. Will not give as many suggestions but it's more reliable
// const citySuggestionsURL = new URL('https://api.openweathermap.org/geo/1.0/direct?q=cluj-napoca&limit=3&appid=8eb16d0f89f9abb9566d44e84d13627f');



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
 * Custom hook to enable suggestion handling in the navbar
 * @param onSubmit what to call when submiting a new city
 * @param onError the handler to call when an error occurs
 * @returns current suggestions, the submit handler with extra functionality and a value changed handler
 */
export function useSuggestionHandling(onSubmit: Function, onError: Function){
    const [suggestions, setSuggestions]: SuggestionsState = useState(null);
    const [error, setError] = useState('');
    const [coordinateTrigger] = useLazyGetCoordinatesQuery();
    const defaultSuggestion = useRef(null);


    // Closure for handling the search of citites. When an user types, it won't fire the fetch immediately,
    // instead it will wait 600ms for input, reseting on each letter typed
    const handleCityChanged = debounce(async (e) => {
        if(e.target.value.length >= 3){
            try{
                const {data: coordinateData} = await coordinateTrigger({city: e.target.value, limit: 3}, true);

                setSuggestions(coordinateData.map(newSuggestion => {
                    return {name: newSuggestion.name.toLocaleLowerCase(), 
                            country: newSuggestion.country.toLocaleLowerCase(), 
                            coords: { lat: newSuggestion.lat, 
                                        long: newSuggestion.lon
                                    }
                            };
                }));
                setError('');
            }
            catch(error){
                setError('network error. could not fetch');
            }
        }
        else
            clearSuggestions();
    }, 600);

    function clearSuggestions(){
        setSuggestions(null);
    }

    // Function for handling city submissions
    function handleSuggestionSubmitted(e) {
        onSubmit(suggestions[e.value]);
        setSuggestions(null);
    }

    return {
        suggestions: suggestions,
        defaultSuggestion: defaultSuggestion,
        suggestionError: error,
        clearSuggestions: clearSuggestions,
        submitHandler: handleSuggestionSubmitted,
        changeHandler: handleCityChanged,
    };
}
