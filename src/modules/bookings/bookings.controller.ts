import { Request, Response } from "express";
import { bookingServices } from "./bookings.services";
import { vehicleServices } from "../vehicles/vehicles.services";

const createBookings = async (req: Request, res: Response) => {
    try {
        const result = await bookingServices.createBookings(req.body);
        
        await vehicleServices.(vehicle_id, "booked");
        
    } catch (err: any) {
        return res.status(400).json({
            success: false,
            message: "Booking failed.",
            error: err.message
        })
        
    }
};

export const bookingController = {
  createBookings,
};
