import { Router } from "express";
import { bookingController } from "./bookings.controller";

const router = Router();

router.post("/", bookingController.createBookings);

export const bookingRoutes = router;
