import "dotenv/config";
import express from "express";
import cors from "cors";
import * as ejs from 'ejs';

import type { Request, Response } from "express";
import type { Message, testTuple } from "../../shared/types.ts";

import wordCheck from "../word-logic/wordCheck.ts";
import wordSelect from "../word-logic/wordSelect.ts";
import { readFile } from "node:fs/promises";

import { connectToMongoDB } from "./dbConnection.ts";

import Game from "./models/Game.ts";
import Highscore from "./models/Highscore.ts";

let wordlist: Array<string>;

try {
  const pathToWords = new URL(
    "../wordlist/svenska-ord-washed.json",
    import.meta.url,
  );
  const fetchedList: string = await readFile(pathToWords, { encoding: "utf8" });
  wordlist = await JSON.parse(fetchedList);
  connectToMongoDB();
} catch (err: any) {
  throw new Error(err.message);
}

const generateGameID = (): string =>
  Math.random().toString(36).substring(2, 10);

const app = express();
const PORT = process.env.SERVER_PORT || 5080;

app.set("view engine", "ejs");
app.set("views", "./backend/views");

app.use(
  cors({
    origin: "http:localhost:5173",
  }),
);

app.use(express.json());

// ####### Server API for game #######
// Adress för att testa API:
app.get("/api/data", (req: Request, res: Response) => {
  const response: Message = {
    text: "Meddelande från TS-servern",
    gameID: "0",
    timestamp: new Date().toISOString(),
  };
  res.json(response);
});

// Adress to start the game
app.get("/api/start-game", async (req: Request, res: Response) => {
  let response: Message = { text: "", gameID: "", timestamp: "" };
  const numberOfChars: number = Number(req.query.wl);
  const allowDups: boolean = Boolean(req.query.dup);
  
  const gameId = generateGameID();
  const startTime = new Date();
  const word = await wordSelect(wordlist, numberOfChars, allowDups);
  
  const game = new Game({ gameId, startTime, word });
  await game.save();

  if (word !== null) {
    response = {
      text: "Secret word is selected",
      gameID: gameId,
      timestamp: new Date().toISOString(),
    };
    res.status(201).json(response);
  } else {
    response = {
      text: "Secret word could not be selected",
      gameID: "0",
      timestamp: new Date().toISOString(),
    };
    res.status(204).json(response);
  }
});

// Adress to finish game
app.post("/api/end-game", async (req: Request, res: Response) => {
  const { gameId } = req.body;

  const game = await Game.findOne({ gameId });
  if (!game) {
    return res.status(404).json({ error: "Game not found" });
  }

  const endTime = new Date();
  const duration = endTime.getTime() - game.startTime.getTime();

  game.endTime = endTime;
  game.duration = duration;
  await game.save();

  res.json({ duration });
});

// Adress to render highscore page
app.get('/highscores')
// Adress to post Gamer Name to the highscore list
app.post("/api/highscores", async (req: Request, res: Response) => {
  const { gameId, gamerName, tries, chars } = req.body;
  const game = await Game.findOne({ gameId });
  let duration: number;
  if (!game) {
    return res.status(404).json({ error: "Game not found" });
  } else {
    if (game.duration) {
      duration = game.duration;
    } else {
      return res.status(424).json({ error: "Game not completed" });
    }
  }
  const highscore = new Highscore();
  highscore.gameId = gameId;
  highscore.duration = duration;
  highscore.numberOfChars = chars;
  highscore.numberOfTries = tries;
  highscore.gamerName = gamerName;
  highscore.save();
  res.json(gameId);
});

// Adress to test guess words
app.post("/api/testword", async (req: Request, res: Response) => {
  const { gameId, word } = req.body;
  const game = await Game.findOne({ gameId });
  if (!game) {
    return res.status(404).json({ error: "Game not found" });
  } else {
    const secretWord = game.word;
    const testResult: Array<testTuple> = wordCheck(word, secretWord);
    res.status(200).json(testResult);
    res.end();
  }
});

// Static route for about page
app.use('/about', express.static('./backend/pages/about.html'));

// Start server
app.listen(PORT, () => {
  console.log(`TS-Servern körs på http://localhost:${PORT}`);
});
