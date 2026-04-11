import mongoose, { Schema, Document } from 'mongoose';

interface IGame extends Document {
  gameId: string;
  startTime: Date;
  word: string;
  dups: boolean;
  endTime?: Date;
  duration?: number;
}

const GameSchema: Schema = new Schema({
  gameId: { type: String, required: true, unique: true },
  startTime: { type: Date, required: true },
  word: {type: String, required: true},
  dups: {type: Boolean, required: true},
  endTime: { type: Date },
  duration: { type: Number }, // i millisekunder
});

export default mongoose.model<IGame>('Game', GameSchema);