import mongoose, { Schema, Document, Model } from "mongoose";

interface IKwis extends Document {
  name: string;
  description: string;
}

const KwisSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

const Kwis: Model<IKwis> = mongoose.model<IKwis>("Kwis", KwisSchema);

export default Kwis;
