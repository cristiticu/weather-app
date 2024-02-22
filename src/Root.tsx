import { Outlet, useNavigation } from "react-router-dom";

import MenuSelector from "./menu";
import Navbar from "./navbar";
import { LoaderSection } from "./sections";

import { useLocalizationNavigation, useStateNavigation } from "./service";
import { MenuOption } from "./types";

const weatherTitles = ['asking the weather gods', 'checking the weather stone', 'looking out the window'];

export default function Root(){
    const {currentURL, cityHandler, menuHandler} = useStateNavigation();
    const localizationHandler = useLocalizationNavigation(currentURL, cityHandler);
    const navigation = useNavigation();

    function handleError(error: Error){
        throw new Error(error.message);
    }

    return (
        <>
            <Navbar searchDisabled={navigation.state === 'loading'} 
                    onCitySubmitted={cityHandler} 
                    onLocate={localizationHandler} 
                    onError={handleError} />

            <MenuSelector selectedMenu={currentURL.split('/')[1] as MenuOption}
                          menuDisabled={navigation.state === 'loading'}
                          onMenuChanged={menuHandler} />

            {navigation.state === 'loading' && <LoaderSection message={weatherTitles[Math.floor(Math.random() * 3)]}/>}

            {navigation.state === 'idle' && <Outlet />}
        </>
    );
}