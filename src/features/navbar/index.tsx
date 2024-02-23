import './navbar.css';

import { NavbarProps } from '../../types.ts';
import { useSuggestionHandling } from './service.ts'

/**
 * Component for the navbar on top of the page. It includes the title, the search bar and the search suggestions
 * provided by the geocoding API
 * @param props two handlers, one for submitting a city and one for handling errors on searching 
 * @returns the component
 */
export default function Navbar({ searchDisabled, onCitySubmitted, onLocate, onError }: NavbarProps) {
    const {suggestions, defaultSuggestion, clearSuggestions, submitHandler, changeHandler} = useSuggestionHandling(onCitySubmitted, onError);

    function handleEnter(e){
        if(e.key === 'Enter' && defaultSuggestion.current)
            submitHandler(defaultSuggestion.current);
    }

    function handleLocate(){
        clearSuggestions();
        onLocate();
    }
    
    return (
        <div className="navbar">
            <span className="title unselectable">weather.net</span>
            <div className="search-wrapper">
                <input disabled={searchDisabled} id="citySearch" className="search-bar" type="search" placeholder="search your city" onChange={changeHandler} onKeyUp={handleEnter} />
                {suggestions &&
                <div className="suggestions">
                    <ul>
                        <li key={-1}>
                            <button onClick={handleLocate} className="suggestion">locate me</button>
                            <hr />
                        </li>
                        {suggestions.length !== 0 ? (
                            suggestions.map((suggestion, index) => {
                                let buttonElement: JSX.Element;

                                if(index === 0)
                                    buttonElement = <button ref={defaultSuggestion} className="suggestion" value={index} onClick={(e) => submitHandler(e.target)}>{suggestion.name + ', ' + suggestion.country}</button>;
                                else
                                    buttonElement = <button className="suggestion" value={index} onClick={(e) => submitHandler(e.target)}>{suggestion.name + ', ' + suggestion.country}</button>;

                                return (<li key={index}>
                                        {buttonElement}
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
