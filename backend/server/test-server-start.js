import start from "./start-server.js";
const testWordlist = ["bästa", "testa"];
export default function testServerStart(list) {
    start(list);
    console.log("The following is server running with testWordlist:" + "\n");
}
testServerStart(testWordlist);
//# sourceMappingURL=test-server-start.js.map