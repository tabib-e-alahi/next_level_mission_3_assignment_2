import { pool } from "../../config/db";

const getAllVehicles = async (payload: Record<string, unknown>) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;

  //! checking car types
  if (!["car", "bike", "van", "SUV"].includes(type as string)) {
    throw new Error(
      "Invalid vehicle types! Types: 'car', 'bike', 'van', or 'SUV'"
    );
  }

  //! checking daily rent price is positive or not
  if (!((daily_rent_price as number) > 0)) {
    throw new Error(`Daily rent price must be positive: ${daily_rent_price}.`);
  }

  //! checking availability status
  const availability_status_lower: string = (
    availability_status as string
  ).toLowerCase();
  if (!["available", "booked"].includes(availability_status_lower)) {
    throw new Error(
      "Invalid inputs! Availability Status is either 'available' or 'booked'"
    );
  }

  const result = await pool.query(
    `
        INSERT INTO Vehicles(vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES($1, $2, $3, $4, $5) RETURNING *
        `,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status_lower,
    ]
  );

  return result;
};

export const vehicleServices = {
  getAllVehicles,
};