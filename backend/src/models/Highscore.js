import mongoose, { Schema, Document } from "mongoose";
const HighscoreSchema = new Schema({
    gameId: { type: String, required: true, unique: true },
    duration: { type: Number, required: true },
    numberOfChars: { type: Number, required: true },
    numberOfTries: { type: Number, required: true },
    gamerName: { type: String, required: true },
});
export default mongoose.model('Highscore', HighscoreSchema);
//# sourceMappingURL=Highscore.js.map