import './Menu.scss';
import wheel from '../assets/menu-icon.png';

export default function Menu() {
    return (
        <div className='menu'>
            <img src={wheel} />
            Menu
        </div>
    );
}