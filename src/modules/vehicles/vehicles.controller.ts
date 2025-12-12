import { Request, Response } from "express"
import { vehicleServices } from "./vehicles.services"

const createVehicle = async(req: Request, res: Response) =>{
    try {
       const result =  await vehicleServices.createVehicle(req.body);
       console.log(result);
    } catch (error:any) {
        console.log("From controller: ",error.message);
    }
}

export const vehicleController = {
    createVehicle
}