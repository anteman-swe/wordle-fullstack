import '../styles/Header.scss';
import headline from '../assets/headline.png';
import Navigation from './Navigation';
import type { settingProps } from '../../../backend/src/shared/types';
import type { ReactNode } from 'react';

export default function Header(
    {updateGameStates, presentSettings}: settingProps): ReactNode {
    return (
        <div className='header'>
            <img src={headline} />
            <Navigation updateGameStates={updateGameStates} presentSettings={presentSettings}/>
        </div>
    )
}