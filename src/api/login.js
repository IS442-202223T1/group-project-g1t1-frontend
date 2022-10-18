import axios from "axios";
import { LOGIN_ENDPOINT } from "./config";

const axiosLoginInstance = axios.create({
  baseURL: LOGIN_ENDPOINT,
  timeout: 5000,
  // headers: { "X-Custom-Header": "foobar" },
});

export const postLogin = async (email, password) => {
  try {
    const res = await axiosLoginInstance.post("", {
      username: email,
      password,
    })
    if (res) {
      return res.headers;
    }
    throw new Error("No data returned from backend");
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
}