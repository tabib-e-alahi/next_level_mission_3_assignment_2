import { pool } from "../../config/db";

const createBookings = async (payload: Record<string, unknown>) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

  const start_date = new Date(rent_start_date as string);
  const end_date = new Date(rent_end_date as string);

  if (start_date >= end_date) {
    throw new Error("Rent end date must be after the rent start date!");
  }

  const rent_duration_in_days =
    (end_date.getTime() - start_date.getTime()) / (1000 * 3600 * 24);

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

  const book_vehicle_status = await pool.query(
    `SELECT status FROM Bookings WHERE vehicle_id=$1`,
    [vehicle_id]
  );

  if (
    book_vehicle_status.rows.length !== 0 &&
    book_vehicle_status.rows[0].status === "active"
  ) {
    throw new Error("This vehicle is already booked.");
  }

  const result = await pool.query(
    `INSERT INTO Bookings (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status) 
       VALUES ($1, $2, $3, $4, $5, 'active') RETURNING *`,
    [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price]
  );

  return {
    id: result.rows[0].id,
    customer_id,
    vehicle_id,
    rent_start_date,
    rent_end_date,
    total_price,
    status: "active",
    vehicle: {
      vehicle_name: vehicle_data.rows[0].vehicle_name,
      daily_rent_price: vehicle_data.rows[0].daily_rent_price,
    },
  };
};

const getAllBookings = async (payload: Record<string, unknown>) => {
  const { role: userRole, id: loggedInUserId } = payload;

  if (userRole === "admin") {
    const result = await pool.query(`SELECT * FROM Bookings`);

    return result;
  } else if (userRole === "customer") {
    const result = await pool.query(
      `SELECT * FROM Bookings WHERE customer_id=$1`,
      [loggedInUserId]
    );

    return result;
  }
};

const updateBookings = async (payload: Record<string, unknown>) => {
  const { bookingId, userRole, loggedInUserId } = payload;
  if (userRole === "admin") {
    const result = await pool.query(
      `UPDATE Bookings SET status=$1 WHERE id=$2 RETURNING *`,
      ["returned", bookingId]
    );

    const vehicleId = result.rows[0].vehicle_id;
    const vehicle_result = await pool.query(
      `UPDATE Vehicles SET availability_status=$1 WHERE id=$2 RETURNING *`,
      ["available", vehicleId]
    );

    const final_result = {
      id: bookingId,
      customer_id: result.rows[0].customer_id,
      vehicle_id: vehicleId,
      rent_start_date: result.rows[0].rent_start_date,
      rent_end_date: result.rows[0].rent_end_date,
      total_price: result.rows[0].total_price,
      status: result.rows[0].status,
      vehicle: {
        availability_status: vehicle_result.rows[0].availability_status,
      },
    };

    return final_result;
  }
  const customer_info = await pool.query(`SELECT customer_id FROM Bookings WHERE id=$1`, [bookingId])
  if(userRole !== 'admin' && )
};

export const bookingServices = {
  createBookings,
  getAllBookings,
  updateBookings,
};
