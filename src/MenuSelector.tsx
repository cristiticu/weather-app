import './stylesheets/menuselector.css';

export default function MenuSelector({ selectedMenu, onMenuChange }) {
    return (
        <ul className='weather-menu'>
            <li>
                <button className='menu-option' onClick={() => onMenuChange('weather')}>weather</button>
            </li>
            <li>
                <button className='menu-option' onClick={() => onMenuChange('forecast')}>forecast</button>
            </li>
            <li>
                <button className='menu-option' onClick={() => onMenuChange('air_pollution')}>aqi</button>
            </li>
        </ul>
    );
}