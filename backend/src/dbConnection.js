// src/dbHandling.ts
import mongoose from 'mongoose';
const dbUri = process.env.MONGODB_URI;
export async function connectToMongoDB() {
    try {
        await mongoose.connect(dbUri);
        console.log('Ansluten till MongoDB med Mongoose!');
    }
    catch (error) {
        console.log('Kunde inte ansluta till MongoDB:', error);
        throw error;
    }
}
export async function closeMongoDBConnection() {
    await mongoose.disconnect();
    console.log('MongoDB anslutningen är stängd.');
}
//# sourceMappingURL=dbConnection.js.map