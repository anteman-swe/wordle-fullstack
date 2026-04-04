import './Navigation.scss';
import Menu from './Menu';
import Settings from './Settings';
import type { settingProps } from '../../../shared/types';

export default function Navigation({updateGameStates, presentSettings}: settingProps) {
    return (
        <div className="navigation">
            <Menu />
            {/* <Language /> */}
            <Settings updateGameStates={updateGameStates} presentSettings={presentSettings}/>

        </div>
    )
}