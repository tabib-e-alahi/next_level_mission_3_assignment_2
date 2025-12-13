const createBookings = async (payload: Record<string, unknown>) => {
    const {customer_id, vehicle_id, rent_start_date, rent_end_date} = payload;

    const start_date = new Date(rent_start_date as string);
    const end_date = new Date(rent_end_date as string);

    if(start_date >= end_date){
        throw new Error("Rent end date must be after the rent start date!");
        return
    }
};

export const bookingServices = {
  createBookings,
};
