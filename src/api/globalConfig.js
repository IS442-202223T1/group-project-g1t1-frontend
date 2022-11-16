import axios from "axios";
import { GLOBAL_CONFIG_ENDPOINT } from "./config";

const axiosGlobalConfigInstance = axios.create({
  baseURL: GLOBAL_CONFIG_ENDPOINT,
  timeout: 5000,
});

export const getGlobalConfig = async (token) => {
  try {
    const res = await axiosGlobalConfigInstance.get("/", {
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

export const updateGlobalConfig= async (
  token,
  loanLimitPerMonth,
  passLimitPerLoan,
  letterHeadUrl,
  corporateMemberName,
) => {
  try {
    const body = {
      loanLimitPerMonth,
      passLimitPerLoan,
      letterHeadUrl,
      corporateMemberName,
    };

    const res = await axiosGlobalConfigInstance.put("/", body, {
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
