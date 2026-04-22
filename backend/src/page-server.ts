import "dotenv/config";
import express, { type Request, type Response } from "express";
import cors from "cors";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";
import Highscore from "./models/Highscore.js";

const __filename: string = fileURLToPath(import.meta.url); // Gives the absolute path to this file from filesystem
const __dirname: string = dirname(__filename); // This directory, where this file is located
const gamePath: string = resolve(__dirname, "..", "game"); // From this dir up 1 levels, then in to 'game' = "/backend/game"
const staticPages: string = resolve(__dirname, "..", "pages"); // Route to the static pages
const stylingDir: string = resolve(__dirname, "..", "styling"); // Route to styling
const assetsDir: string = resolve(__dirname, "..", "assets"); // Route to assets

export default function pageServer() {
  const router = express.Router();

  router.use(cors()); // Allow requests from any domain

  router.use(express.json());

  // Static route for about page
  router.use("/about", express.static(staticPages + "/about.html"));

  // Static route to distribution
  router.use("/", express.static(gamePath));

  // Static routes to styling and assets
  router.use("/css", express.static(stylingDir));
  router.use("/assets", express.static(assetsDir));

  // Adress to render highscore page
  router.get(
    ["/highscores/:length", "/highscores/:length/:duplicates", "/highscores"],
    async (req: Request, res: Response) => {
      let { length, duplicates } = req.params;
      const dbQuery: any = {};

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
    },
  );
  // Catch any of the rest
  router.get("/:path", (req: Request, res: Response) => {
    res.sendFile(join(gamePath, "index.html"));
  });
  return router;
}
