import { Outlet, useNavigation } from 'react-router-dom';

import MenuSelector from '../features/menu';
import Navbar from '../features/navbar';
import { LoaderSection } from '../features/sections';

import { useLocalizationNavigation, useStateNavigation } from './service';
import { MenuOption } from '../types';

const weatherTitles = [
	'asking the weather gods',
	'checking the weather stone',
	'looking out the window',
];

export default function Root() {
	const { currentURL, cityHandler, menuHandler } = useStateNavigation();
	const { localizationHandler, isLocalizing } = useLocalizationNavigation(
		currentURL,
		cityHandler
	);
	const navigation = useNavigation();

	const isSomethingLoading = navigation.state === 'loading' || isLocalizing;

	function handleError(error: Error) {
		throw new Error(error.message);
	}

	return (
		<>
			<Navbar
				searchDisabled={navigation.state === 'loading'}
				onCitySubmitted={cityHandler}
				onLocate={localizationHandler}
				onError={handleError}
			/>

			<MenuSelector
				selectedMenu={currentURL.split('/')[1] as MenuOption}
				menuDisabled={navigation.state === 'loading'}
				onMenuChanged={menuHandler}
			/>

			{isSomethingLoading && (
				<LoaderSection
					message={weatherTitles[Math.floor(Math.random() * 3)]}
				/>
			)}

			{!isSomethingLoading && <Outlet />}
		</>
	);
}
