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

  let updateFields: any = [];

  if (vehicle_name)
    updateFields.pu

  if (type) {
    const result = await pool.query(
      "UPDATE vehicles SET type=$1 WHERE id=$2 RETURNING *",
      [type, vehicleId]
    );
    if (result.rows.length > 0) {
      final_result = result.rows[0]; // Update the vehicle data
    }
  }

  if (registration_number) {
    const result = await pool.query(
      `UPDATE vehicles SET ${registration_number}=$1 WHERE id=$2 RETURNING *`,
      [registration_number, vehicleId]
    );
    if (result.rows.length > 0) {
      final_result = result.rows[0]; // Update the vehicle data
    }
  }

  // Update daily_rent_price if provided
  if (daily_rent_price) {
    const result = await pool.query(
      "UPDATE vehicles SET daily_rent_price=$1 WHERE id=$2 RETURNING *",
      [daily_rent_price, vehicleId]
    );
    if (result.rows.length > 0) {
      final_result = result.rows[0]; // Update the vehicle data
    }
  }

  // Update availability_status if provided
  if (availability_status) {
    const result = await pool.query(
      "UPDATE vehicles SET availability_status=$1 WHERE id=$2 RETURNING *",
      [availability_status, vehicleId]
    );
    if (result.rows.length > 0) {
      final_result = result.rows[0]; // Update the vehicle data
    }
  }

  // If no fields were updated, return null
  if (!updatedVehicle) {
    return null;
  }

  return result;
};

const deleteVehicle = async (payload: Record<string, unknown>) => {
  const { vehicleId } = payload;
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
