import "dotenv/config";
import { fileURLToPath } from "node:url";
import { resolve, dirname } from "node:path";
import combinedServer from "./combinedServer.js";
import { connectToMongoDB, closeMongoDBConnection } from "./dbConnection.js";
import getWordList from "./getWordList.js";

const port = process.env.SERVER_PORT || 5080;

const __filename =  fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const pathToWords = resolve(__dirname, "wordlist", "svenska-ord-washed.json"); // from this directory up 1 level into wordlist to find svenska-ord-washed

export default async function start(listOfWords?: string[]) {
  let words: string[];
  if (listOfWords) {
    words = listOfWords;
  } else {
    words = await getWordList(pathToWords);
  }

  try {
    await connectToMongoDB();
    const cServer = combinedServer(words);
    cServer.listen(port, () => {
      console.log(
        `The Combined Server running on http://localhost:${port}`,
        "\n",
      );
    });
  } catch (err) {
    console.error("Could not start Combined Server", err);
    process.exit(1);
  }
}

process.on("SIGINT", async () => {
  console.log("\n", "Shutting down the connection to MongoDB...", "\n");
  await closeMongoDBConnection();
  process.exit(0);
});
