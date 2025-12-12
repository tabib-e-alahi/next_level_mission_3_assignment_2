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
    //checking
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
