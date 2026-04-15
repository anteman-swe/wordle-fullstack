import { readFile } from "node:fs/promises";
const getWordList = async (pathToWords) => {
    let wordlist = [];
    try {
        const fetchedList = await readFile(pathToWords, { encoding: "utf8" });
        wordlist = await JSON.parse(fetchedList);
    }
    catch (err) {
        throw new Error(err.message);
    }
    return wordlist;
};
export default getWordList;
//# sourceMappingURL=getWordList.js.map