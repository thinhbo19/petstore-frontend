import axios from "axios";
import { apiUrlOrder } from "./config";

export const getAllOrders = async (accessToken) => {
  try {
    const res = await axios.get(`${apiUrlOrder}/`, {
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

export const getAllOrderUser = async (userID, accessToken) => {
  try {
    const res = await axios.get(`${apiUrlOrder}/user/${userID}`, {
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

export const getOneOrder = async (orderId, accessToken) => {
  try {
    const res = await axios.get(`${apiUrlOrder}/userOne/${orderId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching species:", error);
    throw error;
  }
};

export const totalPriceOrder = async (accessToken) => {
  try {
    const res = await axios.get(`${apiUrlOrder}/totalPrice`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data.totalPrice;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
};

export const mostPurchasedProduct = async (accessToken) => {
  try {
    const res = await axios.get(`${apiUrlOrder}/most-purchased`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data.products;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
};

export const totalSalesByMonth = async (accessToken, year) => {
  try {
    const res = await axios.get(`${apiUrlOrder}/total-sales-by-month/${year}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data.data;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
};
