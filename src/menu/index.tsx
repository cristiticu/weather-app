import './menuselector.css';

import { MenuProps } from '../types.ts';

export default function MenuSelector({ menuDisabled, onMenuChanged }: MenuProps) {
    return (
        <div className='weather-menu'>
                <button disabled={menuDisabled} onClick={() => onMenuChanged('weather')}>weather</button>
                <button disabled={menuDisabled} onClick={() => onMenuChanged('forecast')}>forecast</button>
                <button disabled={menuDisabled} onClick={() => onMenuChanged('air_pollution')}>air pollution</button>
        </div>
    );
}