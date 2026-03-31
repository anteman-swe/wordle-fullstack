import express from 'express';
import cors from 'cors';
import type { Request, Response } from 'express';
import type { Message } from '../../shared/types.ts';
import type {testTuple} from '../../shared/types.js';
import wordCheck from '../word-logic/wordCheck .js';

const app = express();
const PORT = 5080;

app.use(cors({
  origin: 'http:localhost:5173'
}));
app.use(express.json());

// interface Message {
//   text: string;
//   timestamp: string;
// }

app.get('/api/data', (req: Request, res: Response) => {
  const response: Message = {
    text: "Meddelande från TS-servern",
    timestamp: new Date().toISOString()
  };
  res.json(response);
});

app.post('/api/testword', (req: Request, res: Response) => {
  
  const wordToTest: string = req.body.word;
  console.log(wordToTest);
  const testResult: Array<testTuple> = wordCheck(wordToTest, "gurka");
  console.log(testResult);
  res.status(200).json(testResult);
  res.end();
});

app.listen(PORT, () => {
  console.log(`TS-Servern körs på http://localhost:${PORT}`);
});

// const test = wordCheck('gurka', 'gurka');