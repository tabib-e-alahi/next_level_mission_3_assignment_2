import { Router } from "express";
import auth from "../../middleware/auth";
const router = Router();

//create a vehicle
router.post("/", auth("admin"), vehi)

export const vehicleRoutes = router;
