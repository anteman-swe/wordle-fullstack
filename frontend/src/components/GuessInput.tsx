import { useState, type ReactNode } from "react";
import "../styles/GuessInput.scss";

const guessPlaceholder: string = "Gissa ordet?";
const guessInputText: string = "Mata in din gissning och klicka på pilen...";
interface guessProps {
  onGuess: (word: string) => void;
}

export default function GuessInput({ onGuess }: guessProps): ReactNode {
  const [guess, setGuess] = useState("");

  return (
    <div className="guessInput">
      <form
        onSubmit={(ev: React.ChangeEvent) => {
          ev.preventDefault();
          onGuess(guess);
          setGuess("");
        }}
      >
        <label>
          <input
            name="guessInput"
            type="text"
            placeholder={guessPlaceholder}
            value={guess}
            onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
              setGuess(ev.target.value);
            }}
          />
          <button type="submit">&gt;</button>
        </label>

        <p>{guessInputText}</p>
      </form>
    </div>
  );
}
