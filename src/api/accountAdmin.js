import axios from "axios";
import { ACCOUNT_ADMIN_ENDPOINT } from "./config";

const axiosAccountAdminInstance = axios.create({
  baseURL: ACCOUNT_ADMIN_ENDPOINT,
  timeout: 5000,
});

export const updateRoles = async (token, email, roles) => {
  try {
    const res = await axiosAccountAdminInstance.put(`/update-roles/${email}`, roles, {
      headers: {
        Authorization: `${token}`,
      },
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
