import { Request, Response } from "express";

const createBookings = async (req: Request, res: Response) => {
    try {
        
    } catch (err: any) {
        return res.status(500).json({
            success: false,
            message:
        })
        
    }
};

export const bookingController = {
  createBookings,
};
