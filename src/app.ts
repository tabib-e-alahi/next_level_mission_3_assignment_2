import express, { Request, Response } from "express";
import initDB from "./config/db";

const app = express();

//?parser
app.use(express.json());

//? db
initDB();

//! user crud routes------------------------->

app.post("/api/v1/auth/signup", async (req: Request, res: Response) => {
    const {name, email, password, phone, role} = req.body;
    {
}
});

export default app;
