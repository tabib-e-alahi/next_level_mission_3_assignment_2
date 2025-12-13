import express, { Request, Response } from "express";
import initDB from "./config/db";
import { authRoutes } from "./modules/auth/auth.routes";
import { userRoutes } from "./modules/users/users.routes";
import { vehicleRoutes } from "./modules/vehicles/vehicles.routes";
import { bookingRoutes } from "./modules/bookings/bookings.routes";

const app = express();

//?parser
app.use(express.json());

//? db
initDB();

//! authentication routes------------------------->
app.use("/api/v1/auth", authRoutes);

//! users routes ------------------------>
app.use("/api/v1/users", userRoutes);

//! vehicles routes ------------------------>
app.use("/api/v1/vehicles", vehicleRoutes);

//! bookingss routes ------------------------>
app.use("/api/v1/bookings", bookingRoutes);

export default app;
