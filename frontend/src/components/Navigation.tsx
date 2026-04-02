import './Navigation.scss';
import Menu from './Menu';
// import Language from './Language';
import Settings from './Settings';

export default function Navigation() {
    return (
        <div className="navigation">
            <Menu />
            {/* <Language /> */}
            <Settings />

        </div>
    )
}