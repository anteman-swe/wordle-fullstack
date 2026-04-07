import "dotenv/config";
import express from "express";
import cors from "cors";
import type { Request, Response } from "express";
import type { Message, testTuple } from "../../shared/types.ts";

import wordCheck from "../word-logic/wordCheck .js";
import wordSelect from "../word-logic/wordSelect.js";
import { readFile } from "node:fs/promises";

import { connectToMongoDB } from "./dbConnection.js";
import Game from "./models/Game.js";
import Highscore from "./models/Highscore.js";

let wordlist: Array<string>;
let secretWord: string = "";

try {
  const pathToWords = new URL(
    "../wordlist/svenska-ord-washed.json",
    import.meta.url,
  );
  const fetchedList: string = await readFile(pathToWords, { encoding: "utf8" });
  wordlist = await JSON.parse(fetchedList);
  connectToMongoDB();
} catch (err: any) {
  console.error(err.message);
}

const generateGameID = (): string =>
  Math.random().toString(36).substring(2, 10);

const app = express();
const PORT = 5080;

app.use(
  cors({
    origin: "http:localhost:5173",
  }),
);

app.use(express.json());

app.get("/api/data", (req: Request, res: Response) => {
  const response: Message = {
    text: "Meddelande från TS-servern",
    gameID: "0",
    timestamp: new Date().toISOString(),
  };
  res.json(response);
});

app.get("/api/start-game", async (req: Request, res: Response) => {
  let response: Message = { text: "", gameID: "", timestamp: "" };
  const numberOfChars: number = Number(req.query.wl);
  const allowDups: boolean = Boolean(req.query.dup);
  const word = wordSelect(wordlist, numberOfChars, allowDups);

  const gameId = generateGameID();
  const startTime = new Date();
  const game = new Game({ gameId, startTime });
  await game.save();

  console.log(word);
  if (word !== null) {
    secretWord = word;
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
  console.log("Duration:", duration);
});

app.get("/api/highscore", (req: Request, res: Response) => {});

app.post("/api/highscore", async (req: Request, res: Response) => {
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

app.post("/api/testword", (req: Request, res: Response) => {
  const wordToTest: string = req.body.word;
  const testResult: Array<testTuple> = wordCheck(wordToTest, secretWord);
  res.status(200).json(testResult);
  res.end();
});

app.listen(PORT, () => {
  console.log(`TS-Servern körs på http://localhost:${PORT}`);
});
