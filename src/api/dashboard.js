import axios from "axios";
import { DASHBOARD_ENDPOINT } from "./config";

const axiosBorrowerInstance = axios.create({
    baseURL: DASHBOARD_ENDPOINT,
    timeout: 5000,
  });

  export const getMonthlyReportCSV = async (token) => {
    try {
      const res = await axiosBorrowerInstance.get("/monthly-report", {
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
