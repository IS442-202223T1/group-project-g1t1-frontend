import axios from "axios";
import { MEMBERSHIP_ENDPOINT } from "./config";

const axiosMembershipInstance = axios.create({
  baseURL: MEMBERSHIP_ENDPOINT,
  timeout: 5000,
});

const token = sessionStorage.getItem("token");


export const getAllMemberships = async () => {
  try {
    const res = await axiosMembershipInstance.get("/", {
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

export const getMembershipDetails = async (membershipName) => {
  try {
    const res = await axiosMembershipInstance.get(`/${membershipName}`, {
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

export const createNewMembership = async (name, description, fee, passType) => {
  try {
    const body = {
      membershipName: name,
      replacementFee: fee,
      isElectronicPass: passType === "electronic",
      description: description,
    };
    const res = await axiosMembershipInstance.post("create-membership", body, {
      headers: {
        Authorization: `${token}`,
      },
    });
    if (res) {
      return res.status >= 200 && res.status < 300;
    }
    throw new Error("No data returned from backend");
  } catch (error) {
    console.log(error);
    return false;
  }
};
