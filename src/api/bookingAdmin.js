import axios from "axios";
import { BOOKING_ADMIN_ENDPOINT } from "./config";

const axiosBookingAdminInstance = axios.create({
  baseURL: BOOKING_ADMIN_ENDPOINT,
  timeout: 5000,
});

export const deleteBookingsByBorrower = async (token, email) => {
  try {
    const res = await axiosBookingAdminInstance.delete(`/booking-by-borrower/${email}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    if (res) {
      return true;
    }
    throw new Error("No data returned from backend");
  } catch (error) {
    console.log(error);
    return false;
  }
};
