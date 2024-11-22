import axios from "axios";
import { apiUrlBooking, apiUrlService } from "./config";

export const getAllService = async () => {
  try {
    const res = await axios.get(`${apiUrlService}/`);
    return res.data.data;
  } catch (error) {
    console.error("Error fetching species:", error);
    throw error;
  }
};

export const getAllSpaServices = async () => {
  try {
    const res = await axios.get(`${apiUrlService}/spa`);
    return res.data.data;
  } catch (error) {
    console.error("Error fetching species:", error);
    throw error;
  }
};

export const getAllHotelServices = async () => {
  try {
    const res = await axios.get(`${apiUrlService}/hotel`);
    return res.data.data;
  } catch (error) {
    console.error("Error fetching species:", error);
    throw error;
  }
};

export const getAllBooking = async () => {
  try {
    const res = await axios.get(`${apiUrlBooking}/`);
    return res.data.data;
  } catch (error) {
    console.error("Error fetching species:", error);
    throw error;
  }
};

export const getAllBookingUser = async (userID, accessToken) => {
  try {
    const res = await axios.get(`${apiUrlBooking}/user/${userID}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data.data;
  } catch (error) {
    console.error("Error fetching species:", error);
    throw error;
  }
};

export const getBookingID = async (bookingId, accessToken) => {
  try {
    const res = await axios.get(`${apiUrlBooking}/${bookingId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data.data;
  } catch (error) {
    console.error("Error fetching species:", error);
    throw error;
  }
};

export const getRatingsByType = async (type) => {
  try {
    const res = await axios.get(`${apiUrlService}/ratings/${type}`);
    return res.data.ratings;
  } catch (error) {
    console.error("Error fetching species:", error);
    throw error;
  }
};
