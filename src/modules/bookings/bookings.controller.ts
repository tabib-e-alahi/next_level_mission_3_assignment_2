import { Request, Response } from "express";
import { bookingServices } from "./bookings.services";
import { vehicleServices } from "../vehicles/vehicles.services";

const createBookings = async (req: Request, res: Response) => {
  try {
    const result = await bookingServices.createBookings(req.body);

    await vehicleServices.updateVehicleByID({
      vehicleId: result.vehicle_id,
      availability_status: "booked",
    });

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: result,
    });
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: "Booking failed.",
      error: err.message,
    });
  }
};

const getAllBookings = async(req: Request, res: Response) =>{
    try {
        
    } catch (error) {
        
    }
}

export const bookingController = {
  createBookings,
  getAllBookings
};
