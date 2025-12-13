import { pool } from "../../config/db";

const createBookings = async (payload: Record<string, unknown>) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

  const start_date = new Date(rent_start_date as string);
  const end_date = new Date(rent_end_date as string);

  if (start_date >= end_date) {
    throw new Error("Rent end date must be after the rent start date!");
  }

  const rent_duration_in_days =
    (end_date.getTime() - start_date.getTime()) / (1000 * 36000 * 24);

  if (rent_duration_in_days <= 0) {
    throw new Error("Vehicle Rental duration must be greater that 0.");
  }

  const vehicle_data = await pool.query(`SELECT * FROM Vehicles WHERE id=$1`, [
    vehicle_id,
  ]);

  if (vehicle_data.rows.length === 0) {
    throw new Error("Vehicle data not found.");
  }

  const total_price =
    vehicle_data.rows[0].daily_rent_price * rent_duration_in_days;

    // const result = await pool.query(
    //   `INSERT INTO Bookings (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status) 
    //    VALUES ($1, $2, $3, $4, $5, 'active') RETURNING *`,
    //   [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price]
    // );
    console.log(rent_end_date, rent_start_date, total_price, rent_duration_in_days);
};

export const bookingServices = {
  createBookings,
};
