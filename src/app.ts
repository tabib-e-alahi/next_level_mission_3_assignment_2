import express, { Request, Response } from "express";
import initDB from "./config/db";
import { authRoutes } from "./modules/auth/auth.routes";

const app = express();

//?parser
app.use(express.json());

//? db
initDB();

//! authentication routes------------------------->
app.use("/api/v1/auth", authRoutes);

export default app;
