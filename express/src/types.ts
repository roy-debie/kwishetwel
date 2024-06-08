import { Document } from "mongoose";

// Define Kwis interface
export interface IKwis extends Document {
  _id: string;
  name: string;
  players: string[];
}

// Define Player interface
export interface IPlayer extends Document {
  _id: string;
  username: string;
  gender: "CHICKIE" | "MAN";
}
