import axios from "axios";
import { EMAIL_ENDPOINT } from "./config";

const axiosEmailInstance = axios.create({
  baseURL: EMAIL_ENDPOINT,
  timeout: 5000,
});


export const postVerifyEmail = async (email) => {
  try {
    const res = await axiosEmailInstance.post(`/verify?email=${email}`);
    if (res) {
      return true;
    }
    throw new Error("No data returned from backend");
  } catch (error) {
    console.log(error);
    return false;
  }
};
