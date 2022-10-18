import axios from "axios";
import { TEST_TOKEN_ENDPOINT } from "./config";

const axiosLoginInstance = axios.create({
  baseURL: TEST_TOKEN_ENDPOINT,
  timeout: 5000,
});

export const testToken = async (token) => {
  try {
    const res = await axiosLoginInstance.get("", {
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
