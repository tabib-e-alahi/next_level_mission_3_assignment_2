const createBookings = async (payload: Record<string, unknown>) => {
    const {customer_id, vehicle_id, rent_start_date, rent_end_date} = payload;

    const start_date = new Date(rent_start_date as string);
};

export const bookingServices = {
  createBookings,
};
