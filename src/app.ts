import express, { Request, Response } from "express";
import initDB from "./config/db";
import { authRoutes } from "./modules/auth/auth.routes";
import { userRoutes } from "./modules/users/users.routes";

const app = express();

//?parser
app.use(express.json());

//? db
initDB();

//! authentication routes------------------------->
app.use("/api/v1/auth", authRoutes);

//! users crud routes ------------------------>
app.use("/api/v1", userRoutes);

export default app;
