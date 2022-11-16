import axios from "axios";
import { DASHBOARD_ENDPOINT } from "./config";

const axiosDashboardInstance = axios.create({
  baseURL: DASHBOARD_ENDPOINT,
  timeout: 5000,
});

export const getMonthlyReport = async (token) => {
  try {
    const res = await axiosDashboardInstance.get("/monthly-report", {
      headers: {
        Authorization: `${token}`,
      },
    });
    if (res) {
      return res.data;
    }
    throw new Error("No data returned from backend");
  } catch (error) {
    return false;
  }
};

export const getEmployeeReport = async (token, duration) => {
  try {
    const res = await axiosDashboardInstance.get(`/employee-report/${duration}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    if (res) {
      return res.data;
    }
    throw new Error("No data returned from backend");
  } catch (error) {
    return false;
  }
};
