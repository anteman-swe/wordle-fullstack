import { useEffect, useState } from 'react';
import './App.scss';
import Header from './components/Header.tsx';
import type { Message } from '../../shared/types.ts';

// Samma interface som i backend (man kan dela dessa i en gemensam mapp senare)
// interface ApiData {
//   text: string;
//   timestamp: string;
// }

function App() {
  const [data, setData] = useState<Message | null>(null);

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then((json: Message) => setData(json));
  }, []);

  return (
    <>
      <Header />
      <h1>Västerbotten Fullstack TS</h1>
      {data && (
        <p>Meddelande: {data.text} <br/> Tid: {data.timestamp}</p>
      )}
    </>
  )
}

export default App
