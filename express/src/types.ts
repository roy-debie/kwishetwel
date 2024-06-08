import { Document } from "mongoose";

// Define Kwis interface
export interface IKwis extends Document {
  name: string;
  players: IPlayer[];
}

// Define Player interface
export interface IPlayer extends Document {
  username: string;
  gender: "CHICKIE" | "MAN";
}
