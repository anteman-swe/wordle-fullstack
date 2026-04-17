import "dotenv/config";
import express from "express";
import cors from "cors";
import ejs from 'ejs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import gameRouter from "./game-server.js";
import pageServer from './page-server.js';
const __filename = fileURLToPath(import.meta.url); // Gives the absolute path to this file from filesystem
const __dirname = path.dirname(__filename); // This directory, where this file is located
const viewsPath = path.join(__dirname, "..", "views"); // Route for the SSR pages templates
export default function cServer(wordlist) {
    const server = express();
    server.engine("ejs", ejs.renderFile);
    server.set("view engine", "ejs");
    server.set("views", viewsPath);
    server.use(cors()); //  Allow requests from any domain
    server.use(express.json());
    server.use("/api", gameRouter(wordlist));
    server.use('/', pageServer());
    return server;
}
//# sourceMappingURL=combinedServer.js.map