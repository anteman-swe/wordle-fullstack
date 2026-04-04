import './Header.scss';
import headline from '../assets/headline.png';
import Navigation from './Navigation';
import type { settingProps } from '../../../shared/types';

export default function Header({updateGameStates, presentSettings}: settingProps){
    return (
        <div className='header'>
            <img src={headline} />
            <Navigation updateGameStates={updateGameStates} presentSettings={presentSettings}/>
        </div>
    )
}