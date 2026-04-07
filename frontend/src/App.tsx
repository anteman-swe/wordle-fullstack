import './App.scss';
import Header from './components/Header.tsx';
import { useState } from 'react';
import { Route, Routes } from 'react-router';
import Game from './components/Game.tsx';
import StartPage from './components/StartPage.tsx';

export default function App() {
  const [numberOfGuesses, setNumberOfGuesses] = useState(6);
  const [numberOfChars, setNumberOfChars] = useState(5);
  const [allowDups, setAllowDups] = useState(false);
  
  const presentSettings = {guesses: numberOfGuesses, chars: numberOfChars, allowDups: allowDups};

  const updateGameStates = (guesses: number, chars: number, dups: boolean) => {
    setNumberOfGuesses(guesses);
    setNumberOfChars(chars);
    setAllowDups(dups);
  }

  return (
    <>
      <Header 
        updateGameStates={updateGameStates} 
        presentSettings={presentSettings}
      />
      <Routes>
        <Route path='/' element={<StartPage />} />
        <Route path='/game' element={
          <Game
            key={`${numberOfGuesses}-${numberOfChars}-${allowDups}`} 
            numberOfGuesses={numberOfGuesses} 
            numberOfChars={numberOfChars} 
            allowDups={allowDups} 
          />} 
        />
      </Routes>
    </>
  )
}

