import axios from "axios";
import { BORROWER_ENDPOINT } from "./config";

const axiosAccountInstance = axios.create({
  baseURL: BORROWER_ENDPOINT,
  timeout: 5000,
}); 



export const getUpcomingBookings = async (token, email) => {
  try {
    const body = {
        "email" : `${email}`,
    }
    const res = await axiosAccountInstance.post("/upcoming-bookings", body, {
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

export const getPastBookings = async (token, email) => {
    try {
      const body = {
          "email" : `${email}`,
      }
      const res = await axiosAccountInstance.post("/past-bookings", body, {
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

  export const cancelBooking = async (token, body) => {
    try {
      const body = {
          "bookingID" : 3,
      }
      const res = await axiosAccountInstance.put("/cancelBooking", body, {
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


export const testToken = async (token) => {
  try {
    const res = await axiosAccountInstance.get("/test", {
      headers: {
        Authorization: `${token}`,
      },
    });
    if (res.status === 200) {
      return true;
    }
    throw new Error("No data returned from backend");
  } catch (error) {
    console.log(error);
    return false;
  }


};
