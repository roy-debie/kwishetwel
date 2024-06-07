import mongoose from "mongoose";
import Kwis from "./models/kwis";
import Player from "./models/player";
import { IKwis, IPlayer } from "./types";

class DBAdapter {
  private uri: string;

  constructor(uri: string) {
    this.uri = uri;
  }

  public async connect(): Promise<void> {
    try {
      await mongoose.connect(this.uri);
      console.log("MongoDB connected successfully");
    } catch (error) {
      console.error("MongoDB connection error:", error);
      process.exit(1);
    }
  }

  public async getKwisses(): Promise<IKwis[]> {
    try {
      const kwisData = await Kwis.find().exec();
      return kwisData;
    } catch (error) {
      console.error("Error fetching Kwisses:", error);
      throw error;
    }
  }

  public async getPlayers(): Promise<IPlayer[]> {
    try {
      const playerData = await Player.find().exec();
      return playerData;
    } catch (error) {
      console.error("Error fetching Players:", error);
      throw error;
    }
  }
}

export default DBAdapter;
