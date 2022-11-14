import axios from "axios";
import { ACCOUNT_ADMIN_ENDPOINT } from "./config";

const axiosAccountAdminInstance = axios.create({
  baseURL: ACCOUNT_ADMIN_ENDPOINT,
  timeout: 5000,
});

export const getAllUser = async (token) => {
  try {
    const res = await axiosAccountAdminInstance.get("/get-all-by-role", {
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

export const disableEmployee = async (token, email) => {
  try {
    const res = await axiosAccountAdminInstance.put(`/disable-employee/${email}`, null, {
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
}

export const enableEmployee = async (token, email) => {
  try {
    const res = await axiosAccountAdminInstance.put(`/enable-employee/${email}`, null, {
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
}
