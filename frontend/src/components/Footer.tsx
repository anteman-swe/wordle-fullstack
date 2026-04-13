import '../styles/Footer.scss';
import logo from '../assets/headline.png';

import { Link }  from 'react-router'
import type { ReactNode } from 'react';
export default function Footer(): ReactNode {

    return (
        <div className='footer-container'>
            <div className='footerlinks'>
                <Link to="/">
                    Hem
                </Link>
                <a href="/about">
                    Om projektet
                </a>
                <Link to="/rules">
                    Regler för Wordle
                </Link>
                <a href="/highscores">
                    Se highscore-listan
                </a>
            </div>
            <p>
                Ett projekt av Anteman SWE 	&copy;
            </p>
            <img src={logo} />
        </div>
    )
} 