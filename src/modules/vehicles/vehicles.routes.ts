import { Router } from "express";
import auth from "../../middleware/auth";
import { vehicleController } from "./vehicles.controller";
const router = Router();

//* create a vehicle
router.post("/", auth("admin"), vehicleController.createVehicle);

//* get all vehicles
router.get("/", vehicleController.getAllVehicles);

//* get single vehicle by id
router.get("/:vehicleId", vehicleController.getVehicleById);

//* delete a vehicle data
router.delete("/:vehicleId", auth("admin"), vehicleController.deleteVehicle);

export const vehicleRoutes = router;
