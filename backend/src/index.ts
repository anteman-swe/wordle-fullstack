import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

interface Message {
  text: string;
  timestamp: string;
}

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