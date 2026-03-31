import express from 'express';
import cors from 'cors';
// @ts-ignore
import { wordCheck } from '../word-logic/wordCheck';
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
app.get('/api/data', (req, res) => {
    const response = {
        text: "Meddelande från TS-servern",
        timestamp: new Date().toISOString()
    };
    res.json(response);
});
app.post('/api/testword', (req, res) => {
    console.log(req.body);
    res.status(200).json(req.body.word);
    res.end();
});
app.listen(PORT, () => {
    console.log(`TS-Servern körs på http://localhost:${PORT}`);
});
// const test = wordCheck('gurka', 'gurka');
//# sourceMappingURL=index.js.map