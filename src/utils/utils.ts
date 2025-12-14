import { pool } from "../config/db";

const autoReturnBookings = async () => {
  const bookings_info = await pool.query(`
    SELECT id, vehicle_id, rent_end_date FROM Bookings WHERE status = 'active'
  `);

  consol

  if (bookings_info.rows.length === 0) {
    return;
  }

  const rent_date_ended_bookings = bookings_info.rows.filter(
    (booking) => new Date(booking.rent_end_date).getTime() > Date.now()
  );

  for (const booking of rent_date_ended_bookings) {
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
