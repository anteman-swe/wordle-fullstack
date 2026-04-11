import mongoose, { Schema, Document } from "mongoose";

interface IScore extends Document {
    gameId: string;
    dups: boolean;
    duration: number;
    numberOfChars: number;
    numberOfTries: number;
    gamerName: string;
}

const HighscoreSchema: Schema = new Schema({
    gameId: {type: String, required: true, unique: true},
    dups: {type: Boolean, required: true},
    duration: {type: Number, required: true},
    numberOfChars: {type: Number, required: true},
    numberOfTries: {type: Number, required: true},
    gamerName: {type: String, required: true},
});

export default mongoose.model<IScore>('Highscore', HighscoreSchema);