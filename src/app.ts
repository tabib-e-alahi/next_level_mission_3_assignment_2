import express, { Request, Response } from "express";
import initDB from "./config/db";
import { userRoutes } from "./modules/user/user.routes";

const app = express();

//?parser
app.use(express.json());

//? db
initDB();

//! user crud routes------------------------->

app.use("/api/v1/auth", userRoutes);


export default app;
