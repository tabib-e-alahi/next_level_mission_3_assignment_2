const getAllVehicles = async (payload: Record<string, unknown>) => {
  try {
    const {
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    } = payload;

    //! checking car types
    if (!["car", "bike", "van", "SUV"].includes(type as string)) {
      throw new Error(
        "Invalid vehicle types! Types: 'car', 'bike', 'van', or 'SUV'"
      );
    }
    //! checking daily rent price is positive or not
    if (!((daily_rent_price as number) > 0)) {
      throw new Error(
        `Daily rent price must be positive: ${daily_rent_price}.`
      );
    }
    const availability_status_lower: string = (
      availability_status as string
    ).toLowerCase();
    //! checking availability status
    if (!["available", "booked"].includes(availability_status_lower)) {
      throw new Error(
        "Invalid Availability Status types. It can be either 'available' or 'booked'"
      );
    }
  } catch (error) {}
};

export const vehicleServices = {
  getAllVehicles,
};
// {
//   "vehicle_name": "Toyota Camry 2024",
//   "type": "car",
//   "registration_number": "ABC-1234",
//   "daily_rent_price": 50,
//   "availability_status": "available"
// }
