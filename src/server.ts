import { Request, Response } from "express";
import app from "./app";
import config from "./config/config";

const port = config.port;

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running, Hello From Tabib E Alahi..");
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
