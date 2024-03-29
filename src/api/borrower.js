import axios from "axios";
import { BORROWER_ENDPOINT } from "./config";

const axiosBorrowerInstance = axios.create({
  baseURL: BORROWER_ENDPOINT,
  timeout: 50000,
});

export const getAllMemberships = async (token) => {
  try {
    const res = await axiosBorrowerInstance.get("/", {
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
    const res = await axiosBorrowerInstance.get(`membership/${membershipName}`, {
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

export const getAvailableBookings = async (token, startDate, endDate) => {
  try {
    const res = await axiosBorrowerInstance.get(
      `available-booking?startDate=${startDate.toISOString().substring(0, 10)}&endDate=${endDate
        .toISOString()
        .substring(0, 10)}`,
      {
        headers: {
          Authorization: `${token}`,
        },
      },
    );
    if (res) {
      return res.data;
    }
    throw new Error("No data returned from backend");
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const createNewBooking = async (token, date, email, membershipName, quantity) => {
  try {
    date.setHours(date.getHours() + 8);
    const body = {
      date,
      email,
      membershipName,
      quantity,
    };

    const res = await axiosBorrowerInstance.post("/booking/create-booking", body, {
      headers: {
        Authorization: `${token}`,
      },
    });

    console.log(res);
    if (res.status === 200) {
      return res;
    }

    throw new Error("No data returned from backend");
  } catch (error) {
    if (error.message === "Request failed with status code 400") {
      return {
        status: 400,
        message: error.response.data,
      };
    }

    if (error.message === "Request failed with status code 409") {
      return {
        status: 409,
        message: error.response.data,
      };
    }

    return {
      status: 500,
    };
  }
};

export const sendEmail = async (token, date, email, membershipName, quantity, bookingResults) => {
  try {
    date.setHours(date.getHours() + 8);
    const body = {
      date,
      email,
      membershipName,
      quantity,
      bookingResults,
    };

    const res = await axiosBorrowerInstance.post("/booking/email", body, {
      headers: {
        Authorization: `${token}`,
      },
    });

    if (res.status === 200) {
      return res;
    }

    throw new Error("No data returned from backend");
  } catch (error) {
    throw new Error("No data returned from backend");
  }
};
