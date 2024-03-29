import axios from "axios";
import { GOP_ENDPOINT } from "./config";

const axiosBookingInstance = axios.create({
  baseURL: GOP_ENDPOINT,
  timeout: 5000,
});

export const getBookingsByEmail = async (token, email) => {
  try {
    const res = await axiosBookingInstance.get(`/bookings/${email}`, {
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

export const getBookingsByDate = async (token) => {
  try {
    const res = await axiosBookingInstance.get("/bookings/today", {
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

export const getBookingsContainingEmail = async (token, email) => {
  try {
    const res = await axiosBookingInstance.get(`/bookings-containing/${email}`, {
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

export const updatePassStatus = async (token, bookingID, actionToPerform) => {
  try {
    const body = {
      bookingID,
      actionToPerform,
    };
    const res = await axiosBookingInstance.patch("/corporate-pass/update-pass-status", body, {
      headers: {
        Authorization: `${token}`,
      },
    });
    if (res) {
      return res.status >= 200 && res.status < 300;
    }
    throw new Error("No data returned from backend");
  } catch (error) {
    console.log(error);
    return false;
  }
};
