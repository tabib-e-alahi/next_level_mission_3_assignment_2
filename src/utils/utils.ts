import { pool } from "../config/db";

const autoReturnBookings = async () => {
  const bookings_info = await pool.query(`
    SELECT id, vehicle_id
    FROM Bookings
    WHERE status = 'active'
  `);

  if (bookings_info.rows.length === 0) {
    return;
  }

  

  for (const booking of expired.rows) {
    await pool.query(`UPDATE Bookings SET status='returned' WHERE id=$1`, [
      booking.id,
    ]);

    await pool.query(
      `UPDATE Vehicles SET availability_status='available' WHERE id=$1`,
      [booking.vehicle_id]
    );
  }
};

export default autoReturnBookings;
