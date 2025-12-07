import express, { Request, Response } from "express";
import initDB from "./config/db";
import config from "./config/config";

const app = express();

//?parser
app.use(express.json());

//? db
initDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running, Hello From Tabib E Alahi..");
});

const port = config.port;

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
