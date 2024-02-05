import './stylesheets/navbar.css'

import { useState } from 'react';


function getSuggestions(search: string): string[] | null {
    if(search.length >= 3)
        return [search, search, search];
    return null;
}


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



export default function Navbar({ onCitySubmitted }){
    const [suggestions, setSuggestions] = useState(null);

    const handleCityChanged = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.value.length >= 3)
            setSuggestions(getSuggestions(e.target.value)); // <-- replace with useEffect here?
        else
            setSuggestions(null);
    }, 600);
    
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
                                        <button className="suggestion" value={suggestion + index.toString()} onClick={(e) => onCitySubmitted(e)}>{suggestion}</button>
                                        </li>);
                        })}
                    </ul>
                </div>}
            </div>
        </div>
    );
}