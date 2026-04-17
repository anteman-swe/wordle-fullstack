import express, {} from "express";
import cors from "cors";
import generateRandomID from "./generateRandomID.js";
import wordCheck from "./word-logic/wordCheck.js";
import wordSelect from "./word-logic/wordSelect.js";
// Import DB Models
import Game from "./models/Game.js";
import Highscore from "./models/Highscore.js";
export default function gameRouter(wordlist) {
    const router = express.Router();
    router.use(cors()); //  Allow requests from any domain
    router.use(express.json());
    // Address to test API:
    router.get("/data", (req, res) => {
        const response = {
            text: "Message from the TS-server",
            gameID: "0",
            timestamp: new Date().toISOString(),
        };
        res.json(response);
    });
    // Adress to start the game
    router.get("/start-game", async (req, res) => {
        let response = { text: "", gameID: "", timestamp: "" };
        const numberOfChars = Number(req.query.wl ?? 0);
        const dups = req.query.dup === "true" ? true : false;
        const gameId = generateRandomID(8); // Generate an random ID, 8 characters long
        const startTime = new Date();
        let word = null;
        if (numberOfChars === 0) {
            word = null;
        }
        else {
            word = wordSelect(wordlist, numberOfChars, dups);
        }
        if (word !== null) {
            response = {
                text: "Secret word is selected",
                gameID: gameId,
                timestamp: new Date().toISOString(),
            };
            const game = new Game({ gameId, startTime, word, dups });
            await game.save();
            res.status(201).json(response);
        }
        else {
            response = {
                text: "Secret word could not be selected",
                gameID: "0",
                timestamp: new Date().toISOString(),
            };
            res.status(400).json(response);
        }
    });
    // Adress to finish game
    router.post("/end-game", async (req, res) => {
        const { gameId } = req.body;
        const game = await Game.findOne({ gameId });
        if (!game) {
            return res.status(404).json({ error: "Game not found" });
        }
        const endTime = new Date();
        const duration = endTime.getTime() - game.startTime.getTime();
        const theWord = game.word;
        game.endTime = endTime;
        game.duration = duration;
        await game.save();
        res.status(200).json({ duration, theWord });
    });
    // Adress to post Gamer Name to the highscore list
    router.post("/highscores", async (req, res) => {
        const { gameId, dups, gamerName, tries, chars } = req.body;
        const game = await Game.findOne({ gameId });
        let duration;
        if (!game) {
            return res.status(404).json({ error: "Game not found" });
        }
        else {
            if (game.duration) {
                duration = game.duration;
            }
            else {
                return res.status(424).json({ error: "Game not completed" });
            }
        }
        const highscore = new Highscore();
        highscore.gameId = gameId;
        highscore.dups = dups;
        highscore.duration = duration;
        highscore.numberOfChars = chars;
        highscore.numberOfTries = tries;
        highscore.gamerName = gamerName;
        highscore.save();
        res.json(gameId);
    });
    // Adress to test guess words
    router.post("/testword", async (req, res) => {
        const { gameId, word } = req.body;
        const game = await Game.findOne({ gameId });
        if (!game) {
            return res.status(404).json({ error: "Game not found" });
        }
        else {
            const secretWord = game.word;
            const testResult = wordCheck(word, secretWord);
            res.status(200).json(testResult);
            res.end();
        }
    });
    return router;
}
//# sourceMappingURL=game-server.js.map