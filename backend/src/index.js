import express from 'express';
import cors from 'cors';
import wordCheck from '../word-logic/wordCheck .js';
import wordSelect from '../word-logic/wordSelect .js';
import { readFile } from 'node:fs/promises';
let wordlist;
try {
    const pathToWords = new URL('../wordlist/svenska-ord-washed.json', import.meta.url);
    const fetchedList = await readFile(pathToWords, { encoding: 'utf8' });
    wordlist = JSON.parse(fetchedList);
}
catch (err) {
    console.error(err.message);
}
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
app.get('/api/startgame', (req, res) => {
    const response = {
        text: "Meddelande från TS-servern",
        timestamp: new Date().toISOString()
    };
    res.json(response);
});
app.post('/api/testword', (req, res) => {
    const wordToTest = req.body.word;
    console.log(wordToTest);
    const testResult = wordCheck(wordToTest, "gurka");
    console.log(testResult);
    res.status(200).json(testResult);
    res.end();
});
app.listen(PORT, () => {
    console.log(`TS-Servern körs på http://localhost:${PORT}`);
});
// const test = wordCheck('gurka', 'gurka');
//# sourceMappingURL=index.js.map