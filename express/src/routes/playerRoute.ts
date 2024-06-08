import { Router, Request, Response } from "express";
import DBAdapter from "../dbAdapter";
import { IPlayer } from "../types";

const router = Router();
const mongoUri = process.env.MONGO_URI || "";
const dbAdapter = new DBAdapter(mongoUri);

router.get("/players", async (req: Request, res: Response) => {
  try {
    const playerData = await dbAdapter.getPlayers();
    return res.status(200).send(playerData);
  } catch (error) {
    return res.status(500).send("Error fetching Playerses");
  }
});

router.get("/players/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const playerData = await dbAdapter.getPlayerById(id);
    return res.status(200).send(playerData);
  } catch (error) {
    return res.status(500).send("Error fetching Player");
  }
});

router.post("/players", async (req: Request, res: Response) => {
  try {
    const playerData: IPlayer = req.body;
    const newPlayer = await dbAdapter.createPlayer(playerData);
    return res.status(201).send(newPlayer);
  } catch (error) {
    return res.status(500).send("Error creating Player");
  }
});

router.delete("/players/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await dbAdapter.deletePlayer(id);
    return res.status(204).send();
  } catch (error) {
    return res.status(500).send("Error deleting Player");
  }
});

router.put("/players/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const playerData: IPlayer = req.body;
    const updatedPlayer = await dbAdapter.updatePlayer(id, playerData);
    return res.status(200).send(updatedPlayer);
  } catch (error) {
    return res.status(500).send("Error updating Player");
  }
});

export default router;
