import axios from "axios";
import { BORROWER_ENDPOINT } from "./config";

const axiosBorrowerInstance = axios.create({
    baseURL: BORROWER_ENDPOINT,
    timeout: 5000,
  });

  export const getAllMemberships = async (token) => {
    try {
      const res = await axiosBorrowerInstance.get("/", {
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

  export const getMembershipDetails = async (token, membershipName) => {
    try {
      const res = await axiosBorrowerInstance.get(`membership/${membershipName}`, {
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

  export const createNewBooking = async (token, date, email, membershipName, quantity) => {
    try {
      const body = {
        date,
        email,
        membershipName,
        quantity,
      };
      const res = await axiosBorrowerInstance.post("/booking/create-booking", body, {
        headers: {
          Authorization: `${token}`,
        },
      });
      if (res) {
        console.log(res.status)
        return res.status;
      }
      throw new Error("No data returned from backend");
    } catch (error) {
      console.log(error);
      return false;
    }
  };
