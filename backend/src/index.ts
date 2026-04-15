import "dotenv/config";
import combinedServer from './combinedServer.js';
import { closeMongoDBConnection } from "./dbConnection.js";

const port = process.env.SERVER_PORT || 5080;

// Start server
const cServer = combinedServer();

cServer.listen(port,() => {
  console.log(`The Combined Server running on http://localhost:${port}`, "\n");
});

process.on('SIGINT', async () => {
  console.log("\n", "Shutting down the connection to MongoDB...", "\n");
  await closeMongoDBConnection();
  process.exit(0);
});