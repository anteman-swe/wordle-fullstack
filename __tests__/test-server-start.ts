import start from "../backend/server/start-server.js";
const testWordlist: string[] = ["bästa", "testa"];

export default function testServerStart(list: string[]) {
  start(list);
  console.log("The following is server running with testWordlist:" + "\n");
}

testServerStart(testWordlist);
