import { Router } from "express";
import auth from "../../middleware/auth";
import { vehicleController } from "./vehicles.controller";
const router = Router();

//* create a vehicle
router.post("/", auth("admin"), vehicleController.createVehicle);

//* get all vehicles
router.get("/", vehicleController.getAllVehicles)

export const vehicleRoutes = router;
