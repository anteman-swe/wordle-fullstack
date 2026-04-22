import "../styles/Game.scss";

import GuessInput from "./GuessInput.tsx";
import Matrix from "./Matrix.tsx";
import GameWon from "./GameWon.tsx";
import GameLost from "./GameLost.tsx";
import FaultyGameStart from "./FaultyGameStart.tsx";

import { useMemo, useState, type ReactNode } from "react";

import type { testTuple } from "../../../shared/types.ts";
import GameExplanation from "./GameExplanation.tsx";
import { useNavigate } from "react-router";
interface gameProps {
  numberOfGuesses: number;
  numberOfChars: number;
  allowDups: boolean;
}

export default function Game(props: gameProps): ReactNode {
  const [endOfGame, setEnd] = useState<boolean>(false);
  const [gameVictory, setVictory] = useState<boolean>(false);
  const [gameFaulty, setFaulty] = useState<boolean>(false);
  const [gameID, setGameID] = useState<string>("");

  const emptyArray = Array(props.numberOfGuesses)
    .fill(null)
    .map(() =>
      Array(props.numberOfChars).fill({ letter: "", result: "unused" }),
    );
  const [guessMatrix, setMatrix] = useState<Array<Array<testTuple>>>(emptyArray);
  const [guessNo, setGuessNo] = useState(0);
  const [currentGameTime, setGameTime] = useState<number>(0);
  const [lastGameWord, setLastWord] = useState<string>('');
  
  const updateRow = (row: number, guessWord: Array<testTuple>) => {
    const newMatrix = [...guessMatrix];
    guessWord.map((charResult, index) => {
      newMatrix[row][index] = charResult;
    });
    setMatrix(newMatrix);
  };

  const navigate = useNavigate();

  async function startTheGame(chars: number, dupsAllowed: boolean) {
    const tryTostartGame: Response = await fetch(
      "/api/start-game?wl=" + chars + "&dup=" + dupsAllowed,
    );
    const gameStarted = await tryTostartGame.json();
    if (tryTostartGame.status !== 204) {
      if (gameStarted.gameID !== "0") {
        setGameID(gameStarted.gameID);
        return;
      } else {
        setFaulty(true);
      }
    } else {
      setFaulty(true);
    }
  }

  async function endTheGame(gId: string): Promise<{duration: number, theWord: string}> {
    const endGame: Response = await fetch('/api/end-game', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({gameId: gId})
    });
    const endAnswer = await endGame.json();
    return endAnswer;
  }

  async function testGuess(word: string) {
    
    if (word.length > props.numberOfChars) {
      word = word.slice(0, props.numberOfChars);
    }

    setGuessNo(guessNo + 1);

    const postArray: unknown = await postGuessWord(word, gameID);
    const resultArray = postArray as Array<testTuple>;
    
    updateRow(guessNo, resultArray);
    
    const victory: boolean = resultArray.every(checkCorrect);
    if (victory && guessNo + 1 <= props.numberOfGuesses) {
      setTimeout(handleWinning, 300);
    } else if (guessNo + 1 >= props.numberOfGuesses && !victory) {
      setTimeout(handleLost, 400);
    }
  }

  function checkCorrect(element: testTuple) {
    return element.result === "correct";
  }

  const handleWinning = async (): Promise<void> => {
    const gameResult = await endTheGame(gameID);
    setGameTime(gameResult.duration);
    setVictory(true);
  };

  const handleLost = async (): Promise<void> => {
    const gameOver = await endTheGame(gameID);
    setLastWord(gameOver.theWord);
    if(!gameVictory) setEnd(true);
  }

  const closeCelebration = (): void => {
    setVictory(false);
    setGuessNo(0);
    setMatrix(emptyArray);
    startTheGame(props.numberOfChars, props.allowDups);
  };

  const closeLostGame = (): void => {
    setEnd(false);
    setGuessNo(0);
    setMatrix(emptyArray);
    startTheGame(props.numberOfChars, props.allowDups);
  }
  
  const closeFaulty = (): void => {
    setFaulty(false);
    setGuessNo(0);
    setMatrix(emptyArray);
    navigate('/');
    
  }

  const postHighscore = (name: string): void => {
    postName(name, gameID, guessNo, props.numberOfChars, props.allowDups);
    closeCelebration();
  };

  useMemo(() => {
    startTheGame(props.numberOfChars, props.allowDups);
  }, [props.numberOfChars, props.allowDups]);

  return (
    <>
      <GuessInput onGuess={testGuess} />
      <Matrix guessMatrix={guessMatrix} />
      <GameExplanation />
      <GameWon
        isOpen={gameVictory}
        onClose={closeCelebration}
        postHighscore={postHighscore}
        durationVar={currentGameTime}
      />
      <GameLost 
        isOpen={endOfGame}
        onClose={closeLostGame}
        lastGameWord={lastGameWord}
      />
      <FaultyGameStart
        isOpen={gameFaulty}
        onClose={closeFaulty}
      />
    </>
  );
}

// Functions outside component
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
  dups: boolean,
) {
  const gameSaved: Response = await fetch("/api/highscores", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
      gameId: gameID, 
      gamerName: name,
      tries: guesses,
      chars: chars,
      dups: dups
    }),
  });
  const saveAnswer = await gameSaved.json();
  return saveAnswer;
}
