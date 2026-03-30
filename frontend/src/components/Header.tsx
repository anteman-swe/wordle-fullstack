import './Header.scss';
import headline from '../assets/headline.png';
import Navigation from './Navigation';

export default function Header(){
    return (
        <div className='header'>
            <img src={headline} />
            <Navigation />
        </div>
    )
}