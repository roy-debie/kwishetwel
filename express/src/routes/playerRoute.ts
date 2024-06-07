import { Router, Request, Response } from "express";
import DBAdapter from "../dbAdapter";

const router = Router();
const mongoUri = process.env.MONGO_URI || "";
const dbAdapter = new DBAdapter(mongoUri);

router.get("/players", async (req: Request, res: Response) => {
  try {
    const playerData = await dbAdapter.getPlayers();
    res.json(playerData);
  } catch (error) {
    res.status(500).send("Error fetching Players");
  }
});

export default router;
