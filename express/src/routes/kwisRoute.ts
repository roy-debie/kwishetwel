import { Router, Request, Response } from "express";
import DBAdapter from "../dbAdapter";

const router = Router();
const mongoUri = process.env.MONGO_URI || "";
const db = new DBAdapter(mongoUri);

router.get("/kwisses", async (req: Request, res: Response) => {
  try {
    const kwisses = await db.getKwisses();
    return res.status(200).send(kwisses);
  } catch (error) {
    res.status(500).send("Error fetching Kwisses");
  }
});

export default router;
