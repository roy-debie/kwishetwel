import { Document } from "mongoose";

// Define Kwis interface
export interface IKwis extends Document {
  name: string;
  description: string;
}

// Define Player interface
export interface IPlayer extends Document {
  username: string;
  score: number;
}
