import axios from "axios";
import { BOOKING_ENDPOINT } from "./config";

const axiosBookingInstance = axios.create({
    baseURL: BOOKING_ENDPOINT,
    timeout: 5000,
  });

  export const getAllBookings = async (token) => {
    try {
      const res = await axiosBookingInstance.get("/", {
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