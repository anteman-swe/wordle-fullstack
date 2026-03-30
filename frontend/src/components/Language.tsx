import './Menu.scss';
import globe from '../assets/lang-icon.png';

export default function Language() {
    return (
        <div className='menu'>
            <img src={globe} />
            Språk
        </div>
    );
}