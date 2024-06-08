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

  public async addPlayerToKwis(
    id: string,
    player: IPlayer
  ): Promise<IKwis | null> {
    try {
      const updatedKwis = await Kwis.findByIdAndUpdate(
        id,
        { $push: { players: player } },
        { new: true }
      ).exec();
      return updatedKwis;
    } catch (error) {
      console.error("Error updating Kwis:", error);
      throw error;
    }
  }

  public async deletePlayerFromKwis(
    id: string,
    playerId: string
  ): Promise<IKwis | null> {
    try {
      const updatedKwis = await Kwis.findByIdAndUpdate(
        id,
        { $pull: { players: playerId } },
        { new: true }
      ).exec();
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

  public async getPlayerById(id: string): Promise<IPlayer | null> {
    try {
      const playerData = await Player.findById(id).exec();
      return playerData;
    } catch (error) {
      console.error("Error fetching Player:", error);
      throw error;
    }
  }

  public async createPlayer(player: IPlayer): Promise<IPlayer> {
    try {
      const newPlayer = new Player(player);
      const savedPlayer = await newPlayer.save();
      return savedPlayer;
    } catch (error) {
      console.error("Error creating Player:", error);
      throw error;
    }
  }

  public async deletePlayer(id: string): Promise<void> {
    try {
      await Player.findByIdAndDelete(id).exec();
    } catch (error) {
      console.error("Error deleting Player:", error);
      throw error;
    }
  }

  public async updatePlayer(
    id: string,
    player: IPlayer
  ): Promise<IPlayer | null> {
    try {
      const updatedPlayer = await Player.findByIdAndUpdate(id, player, {
        new: true,
      }).exec();
      return updatedPlayer;
    } catch (error) {
      console.error("Error updating Player:", error);
      throw error;
    }
  }

  public async startKwis(id: string): Promise<IKwis | null> {
    try {
      const updatedKwis = await Kwis.findByIdAndUpdate(
        id,
        { started: true, rounds: [] },
        { new: true }
      ).exec();
      return updatedKwis;
    } catch (error) {
      console.error("Error starting Kwis:", error);
      throw error;
    }
  }
}

export default DBAdapter;
