import { useState } from 'react';
import './GuessInput.scss';

const guessPlaceholder: string = "Gissa ordet?";
const guessInputText: string = "Mata in din gissning och klicka på pilen...";

export default function GuessInput({ onGuess }) {
    const [guess, setGuess] = useState('');
    const [guessNo, setGuessNo] = useState(0);

    return (
        <>
        <form onSubmit={(ev) => {
            ev.preventDefault();
            const numberOfGuess: number = guessNo;
            onGuess(guess, numberOfGuess);
            setGuessNo(numberOfGuess + 1);
            setGuess('');
        }}>
            <label>
                <input 
                    name='guessInput' 
                    type="text"
                    placeholder={guessPlaceholder}
                    value={guess}
                    onChange={(ev: Event) => {setGuess(ev.target.value)}} 
                />
                <button 
                    type='submit'>&gt;</button>
            </label>
           
            <p>{guessInputText}</p>
        </form>
        
        </>
    )
}