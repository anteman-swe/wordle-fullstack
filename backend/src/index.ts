import express from 'express';
import cors from 'cors';

import type { Request, Response } from 'express';
import type { Message, testTuple } from '../../shared/types.ts';

import wordCheck from '../word-logic/wordCheck .js';
import wordSelect from '../word-logic/wordSelect.js';
import { readFile } from 'node:fs/promises';

let wordlist: Array<string>;
let secretWord: string = "";

try {
  const pathToWords = new URL('../wordlist/svenska-ord-washed.json', import.meta.url);
  const fetchedList: string = await readFile(pathToWords, { encoding: 'utf8' });
  wordlist = JSON.parse(fetchedList);
} catch (err: any) {
  console.error(err.message);
}

const app = express();
const PORT = 5080;

app.use(cors({
  origin: 'http:localhost:5173'
}));

app.use(express.json());

app.get('/api/data', (req: Request, res: Response) => {
  const response: Message = {
    text: "Meddelande från TS-servern",
    timestamp: new Date().toISOString()
  };
  res.json(response);
});

app.get('/api/startgame', (req: Request, res: Response) => {
  let response: Message = {text: "", timestamp: ""};
  const numberOfChars: number = Number(req.query.wl);
  const allowDups: boolean = Boolean(req.query.dup);
  const word = wordSelect(wordlist, numberOfChars, allowDups);
  console.log(word);
  if(word !== null) {
    secretWord = word;
    response = {
      text: "Secret word is selected",
      timestamp: new Date().toISOString()
    };
    res.status(201).json(response);
  } else {
    response = {
      text: "Secret word could not be selected",
      timestamp: new Date().toISOString()
    };
    res.status(204).json(response);
  }
  
});

app.post('/api/testword', (req: Request, res: Response) => {
  const wordToTest: string = req.body.word;
  const testResult: Array<testTuple> = wordCheck(wordToTest, secretWord);
  res.status(200).json(testResult);
  res.end();
});

app.listen(PORT, () => {
  console.log(`TS-Servern körs på http://localhost:${PORT}`);
});
