import './App.scss';
import Header from './components/Header.tsx';
import { useState } from 'react';
import { Route, Routes } from 'react-router';
import Game from './components/Game.tsx';

export default function App() {
  const [numberOfGuesses, setNumberOfGuesses] = useState(6); // TODO: Koppla variabeln till settings
  const [numberOfChars, setNumberOfChars] = useState(5); // TODO: Koppla variabeln till settings
  

  return (
    <>
      <Header />
      <Routes>
        <Route path='/game' element={<Game numberOfGuesses={numberOfGuesses} numberOfChars={numberOfChars} />} />
      </Routes>
    </>
  )
}

