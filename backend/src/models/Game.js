import mongoose, { Schema, Document } from 'mongoose';
const GameSchema = new Schema({
    gameId: { type: String, required: true, unique: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date },
    duration: { type: Number }, // i millisekunder
});
export default mongoose.model('Game', GameSchema);
//# sourceMappingURL=Game.js.map