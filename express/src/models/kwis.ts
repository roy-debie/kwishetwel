import mongoose, { Schema, Model } from "mongoose";
import { IKwis } from "../types";

const KwisSchema: Schema = new Schema({
  name: { type: String, required: true },
  players: [{ type: Schema.Types.ObjectId, ref: "Player" }],
  started: { type: Boolean, required: false, default: false },
  rounds: { type: Array, required: false, default: [] },
  currentRound: { type: Number, required: false, default: 0 },
});

const Kwis: Model<IKwis> = mongoose.model<IKwis>("Kwis", KwisSchema);

export default Kwis;
