import './Game.scss';
import GuessInput from './GuessInput.tsx';
import Matrix from './Matrix.tsx';
import { useEffect, useState } from 'react';
import type { testTuple } from '../../../shared/types.ts';

interface gameProps {
  numberOfGuesses: number;
  numberOfChars: number;
  allowDups: boolean;
}

export default function Game(props: gameProps) {

  const [endOfGame, setEnd] = useState(false);

  const [guessMatrix, setMatrix] = useState(Array(props.numberOfGuesses).fill(null).map(() => 
      Array(props.numberOfChars).fill({letter: '', result: 'incorrect'})));
  
  const updateRow = (row: number, guessWord: Array<testTuple>) => {
      const newMatrix = [...guessMatrix];
      guessWord.map((charResult, index) => {
        newMatrix[row][index] = charResult;
      })
      setMatrix(newMatrix);
  }

  async function startTheGame(chars: number, dupsAllowed: boolean) {
    const tryTostartGame: Response = await fetch('/api/startgame?wl=' + chars + '&dup=' + dupsAllowed);
    const gameStarted = await tryTostartGame.json();
    if(tryTostartGame.status !== 204) {
      if(gameStarted.text) {
        return
      }      
    } else {
      console.log(gameStarted.text);
    }
  }

  async function testGuess(word: string, guessNo: number) {
    if(guessNo > props.numberOfGuesses && !endOfGame) {
      setEnd(true);
    }
    // TODO: Vad ska hända när spelet är slut?

    if(word.length > props.numberOfChars) {
      word = word.slice(0, props.numberOfChars)
    }
    
    const postArray: unknown = await postGuessWord(word);
    const resultArray = postArray as Array<testTuple>;
    updateRow(guessNo,resultArray);
  }

  useEffect(() => {
    startTheGame(props.numberOfChars, props.allowDups);
  }, [props.numberOfChars, props.allowDups]);

  return (
    <>
      <GuessInput onGuess={testGuess}/>
      <Matrix guessMatrix={guessMatrix}/>
    </>
  )
}

async function postGuessWord(testWord: string) {
  const result: Response = await fetch('/api/testword', {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({word: testWord}),
  });
  const resJson = await result.json();
  return resJson;
} 
