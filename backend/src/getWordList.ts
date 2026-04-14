
import { readFile } from "node:fs/promises";

const getWordList = async (pathToWords: string): Promise<string[]> => {
    let wordlist: string[] = [];
    try {
      const fetchedList: string = await readFile(pathToWords, { encoding: "utf8" });
      wordlist = await JSON.parse(fetchedList);
    } catch (err: any) {
      throw new Error(err.message);
    }
    return wordlist;
}

export default getWordList;