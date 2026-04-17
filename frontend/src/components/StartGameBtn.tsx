import '../styles/StartGameBtn.scss';
import smiley from '../assets/smiley.png';
import { useNavigate } from 'react-router';
import type { ReactNode } from 'react';

export default function StartGameBtn(): ReactNode {
  const navigate = useNavigate();
  
    return (
        <>
        <button className='gamestarter' name='START' onClick={() => {navigate('/game')}}>
            <img src={smiley} />
            START
        </button>
        </>
    )
}