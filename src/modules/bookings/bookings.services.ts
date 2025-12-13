const createBookings = async (payload: Record<string, unknown>) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

  const start_date = new Date(rent_start_date as string);
  const end_date = new Date(rent_end_date as string);

  if (start_date >= end_date) {
    throw new Error("Rent end date must be after the rent start date!");
  }
  const start_date_in_days: number = start_date.g

};

export const bookingServices = {
  createBookings,
};
