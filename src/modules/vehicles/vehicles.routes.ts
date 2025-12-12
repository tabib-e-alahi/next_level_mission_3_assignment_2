import { Router } from "express";
import auth from "../../middleware/auth";
import { vehicleController } from "./vehicles.controller";
const router = Router();

//create a vehicle
router.post("/", auth("admin"), vehicleController.createVehicl)

export const vehicleRoutes = router;
