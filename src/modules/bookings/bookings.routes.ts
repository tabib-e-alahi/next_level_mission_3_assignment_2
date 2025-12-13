import { Router } from "express";
import { bookingController } from "./bookings.controller";
import auth from "../../middleware/auth";

const router = Router();

router.post("/", auth("admin", "customer"), bookingController.createBookings);

export const bookingRoutes = router;
