import mongoose, { Schema, Document } from 'mongoose';

interface IGame extends Document {
  gameId: string;
  startTime: Date;
  endTime?: Date;
  duration?: number;
}

const GameSchema: Schema = new Schema({
  gameId: { type: String, required: true, unique: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date },
  duration: { type: Number }, // i millisekunder
});

export default mongoose.model<IGame>('Game', GameSchema);