import { useState } from "react";
import './HighscoreInput.scss';

const highscorePlaceholder: string = "Ditt namn?";
const highscoreText: string = "Lägg till ditt namn i Highscorelistan!";

interface HighscoreProps {
  postHighscore: (name: string) => void;
}

export default function HighscoreInput({ postHighscore }: HighscoreProps) {
    const [name, setName] = useState<string>('');
  
    return (
        <div className="highscoreInput">
            <form onSubmit={(ev:React.ChangeEvent) => {
                ev.preventDefault();
                postHighscore(name);
                setName('');
            }}>
                <label>
                    <input
                        name="highscoreName" 
                        type="text"
                        placeholder={highscorePlaceholder}
                        value={name}
                        onChange={(evnt: React.ChangeEvent<HTMLInputElement>) => {
                            setName(evnt.target.value);
                        }}
                    />
                    <button type="submit">OK</button>
                </label>
                <p>{highscoreText}</p>
            </form>
        </div>
        
    );
}
