import apiClient from "./apiClient";

export const createBooking = async (bookingData) => {
  const { data } = await apiClient.post("/bookings", {
    ...bookingData,
    createdAt: new Date().toISOString(),
    status: "pending",
  });
  return data;
};

export const getAllBookings = async () => {
  const { data } = await apiClient.get("/bookings");
  return data;
};

export const getBookingById = async (id) => {
  const { data } = await apiClient.get(`/bookings/${id}`);
  return data;
};
