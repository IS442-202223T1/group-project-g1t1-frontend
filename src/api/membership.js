import axios from "axios";
import { MEMBERSHIP_ENDPOINT } from "./config";

const axiosMembershipInstance = axios.create({
  baseURL: MEMBERSHIP_ENDPOINT,
  timeout: 5000,
});


export const getAllMemberships = async (token) => {
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

export const getAllActiveMemberships = async (token) => {
  try {
    const res = await axiosMembershipInstance.get("/active", {
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

export const getMembershipDetails = async (token, membershipName) => {
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

export const createNewMembership = async (token, body) => {
  try {
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

export const updateMembership = async (token, originalMembershipName, body) =>{
  try {
    const res = await axiosMembershipInstance.post(`update-membership/${originalMembershipName}`, body, {
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

export const enableMembership = async (token, originalMembershipName) =>{
  try {
    const res = await axiosMembershipInstance.put(`enable-membership/${originalMembershipName}`, {}, {
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

export const deleteMembership = async (token, membershipName,) =>{
  console.log(membershipName);
  try {
    const res = await axiosMembershipInstance.delete(`/${membershipName}`, {
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
