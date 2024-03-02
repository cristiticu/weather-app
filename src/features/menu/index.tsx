import './menuselector.css';

import { MenuProps } from '../../types.ts';

export default function MenuSelector({ selectedMenu, menuDisabled, onMenuChanged }: MenuProps) {
	return (
		<div className='weather-menu'>
			<button
				disabled={menuDisabled || selectedMenu === 'weather'}
				className={(selectedMenu === 'weather' ? 'selected' : '') + ' menu-button'}
				onClick={() => onMenuChanged('weather')}
			>
				weather
			</button>
			<button
				disabled={menuDisabled || selectedMenu === 'forecast'}
				className={(selectedMenu === 'forecast' ? 'selected' : '') + ' menu-button'}
				onClick={() => onMenuChanged('forecast')}
			>
				forecast
			</button>
			<button
				disabled={menuDisabled || selectedMenu === 'air_pollution'}
				className={(selectedMenu === 'air_pollution' ? 'selected' : '') + ' menu-button'}
				onClick={() => onMenuChanged('air_pollution')}
			>
				air pollution
			</button>
		</div>
	);
}
