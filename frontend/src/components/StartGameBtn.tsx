import '../styles/StartGameBtn.scss';
import smiley from '../assets/smiley.png';
import { useNavigate } from 'react-router';
export default function StartGameBtn() {
  const navigate = useNavigate();
  
    return (
        <>
        <div className='gamestarter' onClick={() => {navigate('/game')}}>
            <img src={smiley} />
            <p>START</p>
        </div>
        </>
    )
}