import mongoose from "mongoose";
import Kwis from "./models/kwis"; // Import the Kwis model

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

  public async getKwisses(): Promise<any> {
    try {
      const kwisData = await Kwis.find().exec();
      return kwisData;
    } catch (error) {
      console.error("Error fetching Kwisses:", error);
      throw error;
    }
  }
}

export default DBAdapter;
