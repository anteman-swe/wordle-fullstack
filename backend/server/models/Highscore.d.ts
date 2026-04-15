import mongoose, { Document } from "mongoose";
interface IScore extends Document {
    gameId: string;
    dups: boolean;
    duration: number;
    numberOfChars: number;
    numberOfTries: number;
    gamerName: string;
}
declare const _default: mongoose.Model<IScore, {}, {}, {}, mongoose.Document<unknown, {}, IScore, {}, mongoose.DefaultSchemaOptions> & IScore & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IScore>;
export default _default;
