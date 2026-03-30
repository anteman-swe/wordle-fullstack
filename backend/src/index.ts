import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import type { Message } from '../../shared/types.js'

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

app.listen(PORT, () => {
  console.log(`TS-Servern körs på http://localhost:${PORT}`);
});