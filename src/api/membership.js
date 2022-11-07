import axios from "axios";
import { MEMBERSHIP_ENDPOINT } from "./config";

const axiosEmailInstance = axios.create({
  baseURL: MEMBERSHIP_ENDPOINT,
  timeout: 5000,
});


export const getAllCorporatePassByMembership = async (token, membership) => {
  try {
    const res = await axiosEmailInstance.get(`/${membership}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    if (res) {
      console.log(res.data);
      return res.data;
    }
    throw new Error("No data returned from backend");
  } catch (error) {
    console.log(error);
    return false;
  }
};
