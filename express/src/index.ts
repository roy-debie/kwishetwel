import express, { Request, Response } from "express";
import dotenv from "dotenv";
import DBAdapter from "./dbAdapter";
import kwisRoute from "./routes/kwisRoute";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, world!");
});

// Initialize and connect to MongoDB using DBAdapter
const mongoUri = process.env.MONGO_URI;
if (mongoUri) {
  const dbAdapter = new DBAdapter(mongoUri);
  dbAdapter.connect();
} else {
  console.error(
    "MongoDB connection string is missing in environment variables"
  );
  process.exit(1);
}

// Use the routes
app.use("/api", kwisRoute);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
