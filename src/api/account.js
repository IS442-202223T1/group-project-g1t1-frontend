import axios from "axios";
import { ACCOUNT_ENDPOINT } from "./config";

const axiosAccountInstance = axios.create({
  baseURL: ACCOUNT_ENDPOINT,
  timeout: 5000,
});

export const getCurrentAccount = async (token) => {
  const response = await axiosAccountInstance.get("/me", {
    headers: {
      Authorization: `${token}`,
    },
  });
  return response.data;
};

export const postCreateAccount = async (email, name, contactNumber, password) => {
  try {
    const res = await axiosAccountInstance.post("/create", {
      email,
      name,
      contactNumber,
      password,
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
