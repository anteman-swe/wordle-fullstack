import start from "../backend/src/start-server.js";
const testWordlist: string[] = ["bästa", "testa"];

export default function testServerStart() {
  start(testWordlist);
  console.log("The following is server running with testWordlist:" + "\n");
}

testServerStart();
