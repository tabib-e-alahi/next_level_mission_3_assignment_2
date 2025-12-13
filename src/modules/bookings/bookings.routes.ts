import { Router } from "express";
import { bookingController } from "./bookings.controller";
import auth from "../../middleware/auth";

const router = Router();

router.post("/", auth("admin", "customer"), bookingController.createBookings);
router.get("/", auth("admin", "customer"), bookingController.getAllBookings);

export const bookingRoutes = router;
