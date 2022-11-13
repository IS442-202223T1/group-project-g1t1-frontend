import axios from "axios";
import { GOP_ENDPOINT } from "./config";

const axiosBookingInstance = axios.create({
    baseURL: GOP_ENDPOINT,
    timeout: 5000,
  });

  export const getAllConfirmedBookings = async (token) => {
    try {
      const res = await axiosBookingInstance.get("/bookings/confirmed", {
        headers: {
          Authorization: `${token}`,
        },
      });
      if (res) {
        return res.data;
      }
      throw new Error("No data returned from backend");
    } catch (error) {
      console.log(error);
      return false;
    }
  };