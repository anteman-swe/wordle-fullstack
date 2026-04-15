// src/dbHandling.ts
import 'dotenv/config';
import mongoose from 'mongoose';
const dbUri = process.env.MONGODB_URI;
export async function connectToMongoDB() {
    try {
        await mongoose.connect(dbUri);
        console.log('Connection created to MongoDB with Mongoose!', '\n');
    }
    catch (error) {
        console.log('Could not connect to MongoDB:', error, '\n');
        throw error;
    }
}
export async function closeMongoDBConnection() {
    await mongoose.disconnect();
    console.log('The connection to MongoDB is closed!', '\n');
}
//# sourceMappingURL=dbConnection.js.map