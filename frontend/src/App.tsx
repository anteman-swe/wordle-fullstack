import './App.scss';
import GuessInput from './components/GuessInput.tsx';
import Header from './components/Header.tsx';
import Matrix from './components/Matrix.tsx';
import { useState } from 'react';

const numberOfGuesses: number = 6;
const numberOfChars: number = 5; 


function App() {

  const wordMatrix: Array<Array<string>> =  Array(numberOfGuesses).fill(null).map(() => Array(numberOfChars).fill(""));
  const [guessMatrix, setMatrix] = useState(wordMatrix);

  const updateRow = (row: number, guessWord: Array<string>) => {
      const newMatrix = [...guessMatrix];
      guessWord.map((char, index) => {
        newMatrix[row][index] = char;
      })
      setMatrix(newMatrix);
  }

  function testGuess(word: string, guessNo: number) {
    if(word.length > numberOfChars) {
      word = word.slice(0, numberOfChars)
    }
    const guessArray: Array<string> = word.split('');
    updateRow(guessNo,guessArray);
  }

  return (
    <>
      <Header />
      <GuessInput onGuess={testGuess}/>
      <Matrix guessMatrix={guessMatrix}/>
    </>
  )
}

export default App
