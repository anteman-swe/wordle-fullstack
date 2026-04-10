import "dotenv/config";
import express from "express";
import cors from "cors";
import ejs from 'ejs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

import type { Request, Response } from "express";
import type { Message, testTuple } from "../../shared/types.js";

import wordCheck from "../word-logic/wordCheck.js";
import wordSelect from "../word-logic/wordSelect.js";
import generateRandomID from "./generateRandomID.js";
import { readFile } from "node:fs/promises";
import { connectToMongoDB } from "./dbConnection.js";

import Game from "./models/Game.js";
import Highscore from "./models/Highscore.js";

let wordlist: Array<string>;

const __filename: string = fileURLToPath(import.meta.url); // Gives the absolute path to this file, index.ts, from filesystem
const __dirname: string = path.dirname(__filename); // This directory, where this, index.ts is located
const distPath: string = path.join(__dirname, "..", "dist"); // from this dir up 1 level in to 'dist' = "../dist"
const viewsPath: string = path.join(__dirname, "..", "views"); // Route for the SSR pages templates
const staticPages:string = path.join(__dirname, "..", "pages"); // Route to the static pages

try {
  const pathToWords = path.join(__dirname, "..", "wordlist", "svenska-ord-washed.json"); // from this directory up 1 level into wordlist to find svenska-ord-washed
  const fetchedList: string = await readFile(pathToWords, { encoding: "utf8" });
  wordlist = await JSON.parse(fetchedList);
  connectToMongoDB();
} catch (err: any) {
  throw new Error(err.message);
}

const app = express();
const PORT = process.env.SERVER_PORT || 5080;

app.engine("ejs", ejs.renderFile);
app.set("view engine", "ejs");
app.set("views", viewsPath);

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5080"
    ],
  }),
);

app.use(express.json());

// Static route for about page
app.use('/about', express.static(staticPages + '/about.html'));

app.use('/', express.static(distPath));

// ####### API Server for game #######
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
  const gameId = generateRandomID(8);
  const startTime = new Date();
  const word = wordSelect(wordlist, numberOfChars, allowDups);
  console.log('Ordet:', word);
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

// Adress to render highscore page
app.get('/highscores', async (req: Request, res: Response) => {
  const hresponse = await Highscore.find({})
  .sort({duration: 1, numberOfChars: -1, numberOfTries: 1})
  .exec();
  res.render("highscore",{highscores: hresponse});
});

// All other paths of url's will be returned to index.html a k a homepage
app.get("/:path", (req: Request, res: Response) => {
  if (req.path.startsWith("/api")) {
    return res.status(404).json({error: "API not found"});
  }   
  res.sendFile(path.join(distPath, "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`TS-Servern körs på http://localhost:${PORT}`);
});
