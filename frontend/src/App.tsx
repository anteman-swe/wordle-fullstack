import './App.scss';
import GuessInput from './components/GuessInput.tsx';
import Header from './components/Header.tsx';
import Matrix from './components/Matrix.tsx';
import { useState } from 'react';
import type { testTuple } from '../../shared/types.ts';

export default function App() {

  const [numberOfGuesses, setNumberOfGuesses] = useState(6); // TODO: Koppla variabeln till settings
  const [numberOfChars, setNumberOfChars] = useState(5); // TODO: Koppla variabeln till settings
  const [endOfGame, setEnd] = useState(false);

  const wordMatrix: Array<Array<testTuple>> =  
    Array(numberOfGuesses).fill(null).map(() => 
      Array(numberOfChars).fill({letter: '', result: 'incorrect'}));
  const [guessMatrix, setMatrix] = useState(wordMatrix);

  // function setGuesses(noOfGuess: number) {
  //   setNumberOfGuesses(noOfGuess);
  // };

  // function setChars(noOfChars: number) {
  //   setNumberOfChars(noOfChars);
  // };

  const updateRow = (row: number, guessWord: Array<testTuple>) => {
      const newMatrix = [...guessMatrix];
      guessWord.map((charResult, index) => {
        newMatrix[row][index] = charResult;
      })
      setMatrix(newMatrix);
  }

  async function testGuess(word: string, guessNo: number) {
    if(guessNo > numberOfGuesses && !endOfGame) {
      setEnd(true);
    }

    if(word.length > numberOfChars) {
      word = word.slice(0, numberOfChars)
    }
    
    const postArray: unknown = await postGuessWord(word);
    const resultArray = postArray as Array<testTuple>;
    updateRow(guessNo,resultArray);
  }

  return (
    <>
      <Header />
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
