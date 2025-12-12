import { pool } from "../../config/db";

const createVehicle = async (payload: Record<string, unknown>) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;

  //* checking car types
  if (!["car", "bike", "van", "SUV"].includes(type as string)) {
    throw new Error(
      "Invalid vehicle types! Types: 'car', 'bike', 'van', or 'SUV'"
    );
  }

  //* checking daily rent price is positive or not
  if (!((daily_rent_price as number) > 0)) {
    throw new Error(`Daily rent price must be positive: ${daily_rent_price}.`);
  }

  //* checking availability status
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

const getAllVehicles = async () => {
  const result = await pool.query(`
    SELECT * FROM Vehicles
    `);

  return result;
};

const getVehicleById = async (payload: Record<string, unknown>) => {
  const { vehicleId } = payload;
  const result = await pool.query(
    `
    SELECT * FROM Vehicles WHERE id=$1
    `,
    [vehicleId]
  );

  return result;
};

const updateVehicleByID = async (payload: Record<string, unknown>) => {
  const {
    vehicleId,
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;

  if (type && !["car", "bike", "van", "SUV"].includes(type as string)) {
    throw new Error(
      "Invalid vehicle types! Types: 'car', 'bike', 'van', or 'SUV'"
    );
  }

  if (daily_rent_price && (daily_rent_price as number) <= 0) {
    throw new Error(`Daily rent price must be positive: ${daily_rent_price}.`);
  }

  if (
    availability_status &&
    !["available", "booked"].includes(
      (availability_status as string).toLowerCase()
    )
  ) {
    throw new Error(
      "Invalid inputs! Availability Status is either 'available' or 'booked'"
    );
  }

  let updateFields: any = {};

  if (vehicle_name) updateFields.vehicle_name = vehicle_name;
  if (type) updateFields.type = type;
  if (registration_number)
    updateFields.registration_number = registration_number;
  if (daily_rent_price) updateFields.daily_rent_price = daily_rent_price;
  if (availability_status)
    updateFields.availability_status = availability_status;

  if (Object.keys(updateFields).length === 0) {
    throw new Error("There is no valid fields to update.");
  }

  let final_result: any = null;

  for (const key of Object.keys(updateFields)) {
    const result = await pool.query(
      `UPDATE Vehicles SET ${key}=$1 WHERE id=$2 RETURNING *`,
      [updateFields[key], vehicleId]
    );
    if (result.rows.length > 0) {
      final_result = result;
    }
  }

  return final_result;
};

const deleteVehicle = async (payload: Record<string, unknown>) => {
  const { vehicleId } = payload;

  const availability_status_result = await pool.query(
    "SELECT availability_status FROM Vehicles WHERE id=$1",
    [vehicleId]
  );

  if (availability_status_result.rows.length === 0) {
    throw new Error("Vehicle data not found!");
  }

  const availability_status = availability_status_result.rows[0].availability_status;

  if (availability_status !== "booked") {
    throw new Error("Only vehicles with 'booked' status can be deleted.");
  }
  const result = await pool.query(`DELETE FROM Vehicles WHERE id=$1`, [
    vehicleId,
  ]);

  console.log(result);

  return result;
};

export const vehicleServices = {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicleByID,
  deleteVehicle,
};
