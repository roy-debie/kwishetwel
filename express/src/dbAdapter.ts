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

  public async getKwisById(id: string): Promise<IKwis | null> {
    try {
      const kwisData = await Kwis.findById(id).exec();
      return kwisData;
    } catch (error) {
      console.error("Error fetching Kwis:", error);
      throw error;
    }
  }

  public async createKwis(kwis: IKwis): Promise<IKwis> {
    try {
      const newKwis = new Kwis(kwis);
      const savedKwis = await newKwis.save();
      return savedKwis;
    } catch (error) {
      console.error("Error creating Kwis:", error);
      throw error;
    }
  }

  public async deleteKwis(id: string): Promise<void> {
    try {
      await Kwis.findByIdAndDelete(id).exec();
    } catch (error) {
      console.error("Error deleting Kwis:", error);
      throw error;
    }
  }

  public async updateKwis(id: string, kwis: IKwis): Promise<IKwis | null> {
    try {
      const updatedKwis = await Kwis.findByIdAndUpdate(id, kwis, {
        new: true,
      }).exec();
      return updatedKwis;
    } catch (error) {
      console.error("Error updating Kwis:", error);
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
