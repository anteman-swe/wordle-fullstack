import mongoose, { Document } from 'mongoose';
interface IGame extends Document {
    gameId: string;
    startTime: Date;
    endTime?: Date;
    duration?: number;
}
declare const _default: mongoose.Model<IGame, {}, {}, {}, mongoose.Document<unknown, {}, IGame, {}, mongoose.DefaultSchemaOptions> & IGame & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IGame>;
export default _default;
//# sourceMappingURL=Game.d.ts.map