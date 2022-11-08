import axios from "axios";
import { MEMBERSHIP_ENDPOINT } from "./config";

const axiosEmailInstance = axios.create({
  baseURL: MEMBERSHIP_ENDPOINT,
  timeout: 5000,
});


export const getMembershipDetails = async (token, membershipName) => {
  try {
    const res = await axiosEmailInstance.get(`/${membershipName}`, {
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
