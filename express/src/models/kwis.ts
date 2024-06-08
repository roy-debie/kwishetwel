import mongoose, { Schema, Model } from "mongoose";
import { IKwis } from "../types";

const KwisSchema: Schema = new Schema({
  name: { type: String, required: true },
});

const Kwis: Model<IKwis> = mongoose.model<IKwis>("Kwis", KwisSchema);

export default Kwis;
