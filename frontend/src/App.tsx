import './App.scss';

import { useState, type ReactNode } from 'react';
import { Route, Routes } from 'react-router';

import Header from './components/Header.tsx';
import Game from './components/Game.tsx';
import StartPage from './components/StartPage.tsx';
import Rules from './components/Rules.tsx';
import Footer from './components/Footer.tsx';

export default function App(): ReactNode {
  const [numberOfGuesses, setNumberOfGuesses] = useState(6);
  const [numberOfChars, setNumberOfChars] = useState(5);
  const [allowDups, setAllowDups] = useState(false);
  
  const presentSettings = {guesses: numberOfGuesses, chars: numberOfChars, allowDups: allowDups};

  const updateGameStates = (guesses: number, chars: number, dups: boolean) => {
    const useGuesses: number = guesses < 6 ? 6 : guesses; 
    setNumberOfGuesses(useGuesses);
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
        <Route path='/rules' element={<Rules />} />
      </Routes>
      <Footer />
    </>
  )
}

