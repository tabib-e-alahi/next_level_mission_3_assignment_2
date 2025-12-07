import express, { Request, Response } from "express";
import initDB from "./config/db";

const app = express();
const port = 5000;

//?parser
app.use(express.json());

//? db
initDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running, Hello From Tabib E Alahi..");
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
