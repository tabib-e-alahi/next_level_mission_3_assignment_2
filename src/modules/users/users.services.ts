import { pool } from "../../config/db";

const getAllUsers = async () => {
  const result = await pool.query(`
        SELECT id, name, email, phone, role FROM Users
    `);

  return result;
};

const updateUser = async(payload: Record<string, unknown>) =>{
  const {
    userId,
    name,
    email,
    password,
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

export const userServices = {
  getAllUsers,
  updateUser
};
