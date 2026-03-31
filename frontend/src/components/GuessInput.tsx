import { useState } from 'react';
import './GuessInput.scss';

const guessPlaceholder: string = "Gissa ordet?";
const guessInputText: string = "Mata in din gissning och klicka på pilen...";

interface guessProps {
    onGuess: (word: string, guessNo: number) => void;
}

export default function GuessInput({ onGuess }: guessProps) {
    const [guess, setGuess] = useState('');
    const [guessNo, setGuessNo] = useState(0);

    return (
        <>
        <form onSubmit={(ev: React.ChangeEvent) => {
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
                    onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {setGuess(ev.target.value)}} 
                />
                <button type='submit'>&gt;</button>
            </label>
           
            <p>{guessInputText}</p>
        </form>
        
        </>
    )
}