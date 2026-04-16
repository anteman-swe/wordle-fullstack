import "dotenv/config";
import express, {} from "express";
import cors from "cors";
import { fileURLToPath } from "node:url";
import path from "node:path";
import Highscore from "./models/Highscore.js";
const __filename = fileURLToPath(import.meta.url); // Gives the absolute path to this file from filesystem
const __dirname = path.dirname(__filename); // This directory, where this file is located
const distPath = path.join(__dirname, "..", "..", "frontend", "dist"); // From this dir up 2 levels, then in to 'dist' = "../frontend/dist"
const viewsPath = path.join(__dirname, "..", "views"); // Route for the SSR pages templates
const staticPages = path.join(__dirname, "..", "pages"); // Route to the static pages
const stylingDir = path.join(__dirname, "..", "styling"); // Route to styling
const assetsDir = path.join(__dirname, "..", "assets"); // Route to assets
export default function pageServer() {
    const router = express.Router();
    router.use(cors()); //  Allow requests from any domain
    router.use(express.json());
    // Static route for about page
    router.use("/about", express.static(staticPages + "/about.html"));
    // Static route to distribution
    router.use("/", express.static(distPath));
    // Static routes to styling and assets
    router.use("/css", express.static(stylingDir));
    router.use("/assets", express.static(assetsDir));
    // Adress to render highscore page
    router.get(["/highscores/:length", "/highscores/:length/:duplicates", "/highscores"], async (req, res) => {
        let { length, duplicates } = req.params;
        const dbQuery = {};
        if (length && length !== "all") {
            dbQuery.numberOfChars = length;
        }
        if (!length) {
            length = "all";
        }
        if (duplicates && duplicates !== "all") {
            dbQuery.dups = duplicates === "true";
        }
        if (!duplicates) {
            duplicates = "all";
        }
        const hresponse = await Highscore.find(dbQuery)
            .sort({ duration: 1, numberOfChars: -1, numberOfTries: 1 })
            .exec();
        res.render("highscore", {
            highscores: hresponse,
            currentLength: length,
            currentDups: duplicates,
        });
    });
    return router;
}
//# sourceMappingURL=page-server.js.map