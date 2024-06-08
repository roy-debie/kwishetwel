import { Document } from "mongoose";

// Define Kwis interface
export interface IKwis extends Document {
  _id: string;
  name: string;
  players: string[];
  started: boolean;
  rounds: IRound[];
}

// Define Player interface
export interface IPlayer extends Document {
  _id: string;
  username: string;
  gender: "CHICKIE" | "MAN";
}

// Define Round interface
export interface IRound extends Document {
  _id: string;
  current: boolean;
  playerRounds: Array<IPlayerRound>;
}

export interface IPlayerRound extends Document {
  _id: string;
  player: string;
  category: string;
  question: string;
  answer: string;
  difficulty: string;
  points: number;
  correct: boolean;
  status: "current" | "done";
}
