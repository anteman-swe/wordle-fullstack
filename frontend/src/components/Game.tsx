import "./Game.scss";
import GuessInput from "./GuessInput.tsx";
import Matrix from "./Matrix.tsx";
import GameWon from './GameWon.tsx'
import { useEffect,useState } from "react";
import type { testTuple } from "../../../shared/types.ts";
interface gameProps {
  numberOfGuesses: number;
  numberOfChars: number;
  allowDups: boolean;
}

export default function Game(props: gameProps) {
  const [endOfGame, setEnd] = useState<boolean>(false);
  const [gameVictory, setVictory] = useState<boolean>(false);
  const [gameID, setGameID] = useState<string>('');

  console.log('GameID:', gameID);
  const emptyArray = Array(props.numberOfGuesses)
      .fill(null)
      .map(() =>
        Array(props.numberOfChars).fill({ letter: "", result: "incorrect" }),
      );
  const [guessMatrix, setMatrix] = useState(emptyArray);
  const [guessNo, setGuessNo] = useState(0);

  const updateRow = (row: number, guessWord: Array<testTuple>) => {
    const newMatrix = [...guessMatrix];
    guessWord.map((charResult, index) => {
      newMatrix[row][index] = charResult;
    });
    setMatrix(newMatrix);
  };

  async function startTheGame(chars: number, dupsAllowed: boolean) {
    const tryTostartGame: Response = await fetch(
      "/api/start-game?wl=" + chars + "&dup=" + dupsAllowed,
    );
    const gameStarted = await tryTostartGame.json();
    if (tryTostartGame.status !== 204) {
      if (gameStarted.text) {
        setGameID(gameStarted.gameID);
        return;
      }
    } else {
      console.log(gameStarted.text);
    }
  }

  async function testGuess(word: string) {
    if (guessNo >= props.numberOfGuesses && !endOfGame) {
      setEnd(true);
    }
    // TODO: Vad ska hända när spelet är slut utan lösning?

    if (word.length > props.numberOfChars) {
      word = word.slice(0, props.numberOfChars);
    }
    setGuessNo(guessNo +  1);
    const postArray: unknown = await postGuessWord(word);
    const resultArray = postArray as Array<testTuple>;
    updateRow(guessNo, resultArray);
    const victory: boolean = resultArray.every(checkCorrect);
    if(victory) {
      setTimeout(handleWinning, 800);
    }
  }

  function checkCorrect(element: testTuple) {
    return element.result === 'correct';
  }

  const handleWinning = (): void => {
    setVictory(true);
    setMatrix(emptyArray);
    
  }

  const closeCelebration = (): void => {
    setVictory(false);
    setGuessNo(0);
    startTheGame(props.numberOfChars, props.allowDups);
  }

  useEffect(() => {
    startTheGame(props.numberOfChars, props.allowDups);
  }, [props.numberOfChars, props.allowDups]);

  return (
    <>
      <GuessInput onGuess={testGuess} />
      <Matrix guessMatrix={guessMatrix} />
      <GameWon isOpen={gameVictory} onClose={closeCelebration} />
    </>
  );
}

async function postGuessWord(testWord: string) {
  const result: Response = await fetch("/api/testword", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ word: testWord }),
  });
  const resJson = await result.json();
  return resJson;
}