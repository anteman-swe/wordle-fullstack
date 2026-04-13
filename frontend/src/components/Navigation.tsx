import '../styles/Navigation.scss';

import Menu from './Menu';
import Settings from './Settings';

import type { settingProps } from '../../../shared/types';
import type { ReactNode } from 'react';

export default function Navigation(
    {updateGameStates, presentSettings}: settingProps): ReactNode {
    return (
        <div className="navigation">
            <Menu />
            <Settings updateGameStates={updateGameStates} presentSettings={presentSettings}/>

        </div>
    )
}