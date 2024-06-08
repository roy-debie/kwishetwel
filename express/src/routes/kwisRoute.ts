import { Router, Request, Response } from "express";
import DBAdapter from "../dbAdapter";
import { IKwis, IPlayer, IRound } from "../types";

const router = Router();
const mongoUri = process.env.MONGO_URI || "";
const dbAdapter = new DBAdapter(mongoUri);

router.get("/kwisses", async (req: Request, res: Response) => {
  try {
    const kwisData = await dbAdapter.getKwisses();
    return res.status(200).send(kwisData);
  } catch (error) {
    return res.status(500).send("Error fetching Kwisses");
  }
});

router.get("/kwisses/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const kwisData = await dbAdapter.getKwisById(id);
    return res.status(200).send(kwisData);
  } catch (error) {
    return res.status(500).send("Error fetching Kwis");
  }
});

router.post("/kwisses", async (req: Request, res: Response) => {
  try {
    const kwisData: IKwis = req.body;
    const newKwis = await dbAdapter.createKwis(kwisData);
    return res.status(201).send(newKwis);
  } catch (error) {
    return res.status(500).send("Error creating Kwis");
  }
});

router.delete("/kwisses/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await dbAdapter.deleteKwis(id);
    return res.status(204).send();
  } catch (error) {
    return res.status(500).send("Error deleting Kwis");
  }
});

router.put("/kwisses/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const kwisData: IKwis = req.body;
    const updatedKwis = await dbAdapter.updateKwis(id, kwisData);
    return res.status(200).send(updatedKwis);
  } catch (error) {
    return res.status(500).send("Error updating Kwis");
  }
});

router.put("/kwisses/add-player/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const playerData: IPlayer = req.body.player;
    const updatedKwis = await dbAdapter.addPlayerToKwis(id, playerData);
    return res.status(200).send(updatedKwis);
  } catch (error) {
    return res.status(500).send("Error updating Kwis");
  }
});

router.put(
  "/kwisses/delete-player/:id",
  async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const playerId: string = req.body.player;
      const updatedKwis = await dbAdapter.deletePlayerFromKwis(id, playerId);
      return res.status(200).send(updatedKwis);
    } catch (error) {
      return res.status(500).send("Error updating Kwis");
    }
  }
);

router.put("/kwisses/start/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updatedKwis = await dbAdapter.startKwis(id);
    return res.status(200).send(updatedKwis);
  } catch (error) {
    return res.status(500).send("Error updating Kwis");
  }
});

router.get("/round1/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const kwisData = await dbAdapter.getKwisById(id);
    if (!kwisData) {
      return res.status(404).send("Kwis not found");
    }
    //find the object in the array that has the number 1
    const kwisRound1 = kwisData.rounds.find((round) => round.number === 1);
    if (kwisRound1) {
      return res.status(200).send(kwisRound1);
    } else {
      //for the playerRounds array, we need to add a new object for each player in the kwis
      // with the status current and points 0 and place them in random order
      // for each player in the kwis, we need to add a new playerRound object with the status current and points 0
      // and add them to the playerRounds array
      // shuffle the playerRounds array
      // add the playerRounds array to the kwisRound1 object
      const playerRounds = kwisData.players.map((player) => {
        return {
          player: player,
          category: "",
          question: "",
          answer: "",
          points: 0,
          status: "to be answered",
        };
      });
      const shuffledPlayerRounds = playerRounds.sort(() => Math.random() - 0.5);
      const newRound: IRound = {
        number: 1,
        current: true,
        playerRounds: shuffledPlayerRounds,
      } as IRound extends Document ? IRound : never;
      kwisData.rounds.push(newRound);
      await dbAdapter.updateKwis(id, kwisData);
      return res.status(200).send(newRound);
    }
  } catch (error) {
    return res.status(500).send("Error fetching Kwisses");
  }
});

export default router;
