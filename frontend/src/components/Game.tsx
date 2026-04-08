import "./Game.scss";
import GuessInput from "./GuessInput.tsx";
import Matrix from "./Matrix.tsx";
import GameWon from "./GameWon.tsx";
import { useMemo, useState } from "react";
import type { testTuple } from "../../../shared/types.ts";
interface gameProps {
  numberOfGuesses: number;
  numberOfChars: number;
  allowDups: boolean;
}

export default function Game(props: gameProps) {
  const [endOfGame, setEnd] = useState<boolean>(false);
  const [gameVictory, setVictory] = useState<boolean>(false);
  const [gameID, setGameID] = useState<string>("");

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

  async function endTheGame(gId: string): Promise<void> {
    await fetch('/api/end-game', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({gameId: gId})
    });
  }

  async function testGuess(word: string) {
    if (guessNo >= props.numberOfGuesses && !endOfGame) {
      setEnd(true);
    }
    // TODO: Vad ska hända när spelet är slut utan lösning?

    if (word.length > props.numberOfChars) {
      word = word.slice(0, props.numberOfChars);
    }
    setGuessNo(guessNo + 1);
    const postArray: unknown = await postGuessWord(word, gameID);
    const resultArray = postArray as Array<testTuple>;
    updateRow(guessNo, resultArray);
    const victory: boolean = resultArray.every(checkCorrect);
    if (victory) {
      setTimeout(handleWinning, 600);
    }
  }

  function checkCorrect(element: testTuple) {
    return element.result === "correct";
  }

  const handleWinning = (): void => {
    endTheGame(gameID);
    setVictory(true);
    setMatrix(emptyArray);
  };

  const closeCelebration = (): void => {
    setVictory(false);
    setGuessNo(0);
    startTheGame(props.numberOfChars, props.allowDups);
  };

  const postHighscore = (name: string) => {
    postName(name, gameID, guessNo, guessMatrix[0].length);
    console.log(
      "Namn:", name, 
      'ID:', gameID, 
      'Gissningar:', guessNo, 
      'Ordlängd:', guessMatrix[0].length
    );
    closeCelebration();
  };

  useMemo(() => {
    startTheGame(props.numberOfChars, props.allowDups);
  }, [props.numberOfChars, props.allowDups]);

  return (
    <>
      <GuessInput onGuess={testGuess} />
      <Matrix guessMatrix={guessMatrix} />
      <GameWon
        isOpen={gameVictory}
        onClose={closeCelebration}
        postHighscore={postHighscore}
      />
    </>
  );
}

async function postGuessWord(testWord: string, gameId: string) {
  const result: Response = await fetch("/api/testword", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ gameId: gameId, word: testWord }),
  });
  const resJson = await result.json();
  return resJson;
}

async function postName(
  name: string, 
  gameID: string, 
  guesses: number, 
  chars: number,
) {
  const gameSaved: Response = await fetch("/api/highscore", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
      gameId: gameID, 
      gamerName: name,
      tries: guesses,
      chars: chars
    }),
  });
  const saveAnswer = await gameSaved.json();
  console.log(saveAnswer);
  return saveAnswer;
}
