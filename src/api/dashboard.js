import axios from "axios";
import { DASHBOARD_ENDPOINT } from "./config";

const axiosDashboardInstance = axios.create({
  baseURL: DASHBOARD_ENDPOINT,
  timeout: 5000,
});

export const getMonthlyReport = async (token, year) => {
  try {
    const res = await axiosDashboardInstance.get(`/monthly-report/${year}`, {
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

export const getEmployeeReportByMonth = async (token, month, year) => {
  try {
    const res = await axiosDashboardInstance.get(`/employee-report-by-month?month=${month}&year=${year}`, {
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

export const getEmployeeReportByYear = async (token, year) => {
  try {
    const res = await axiosDashboardInstance.get(`/employee-report-by-year?year=${year}`, {
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

export const getEmployeeReportByPeriod = async (token, startDate, endDate) => {
  try {
    const res = await axiosDashboardInstance.get(`/employee-report-by-period?startMonth=${startDate.getMonth()+1}&startYear=${startDate.getFullYear()}&endMonth=${endDate.getMonth()+1}&endYear=${endDate.getFullYear()}`, {
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

export const getMembershipReport = async (token, membership) => {
  try {
    const res = await axiosDashboardInstance.get(`/membership-report/${membership}`, {
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
