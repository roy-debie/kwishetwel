import { Router, Request, Response } from "express";
import DBAdapter from "../dbAdapter";
import { IKwis } from "../types";

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

export default router;
