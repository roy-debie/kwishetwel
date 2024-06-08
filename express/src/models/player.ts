import mongoose, { Schema, Model } from "mongoose";
import { IPlayer } from "../types";

const PlayerSchema: Schema = new Schema({
  username: { type: String, required: true },
  gender: { type: String, required: true },
});

const Player: Model<IPlayer> = mongoose.model<IPlayer>("Player", PlayerSchema);

export default Player;
