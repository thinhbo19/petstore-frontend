import axios from "axios";
import { apiUrlVoucher } from "./config";

export const getAllVouchers = async () => {
  try {
    const res = await axios.get(`${apiUrlVoucher}/`);
    return res.data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getAllVouchersClient = async () => {
  try {
    const res = await axios.get(`${apiUrlVoucher}/client`);
    return res.data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const postVoucher = async (accessToken, formData) => {
  try {
    const res = await axios.post(`${apiUrlVoucher}/addVoucher`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data.Voucher;
  } catch (error) {
    console.error("Error fetching species:", error);
    throw error;
  }
};

export const changeVoucher = async (accessToken, formData, nid) => {
  try {
    const res = await axios.put(`${apiUrlVoucher}/${nid}`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data.message;
  } catch (error) {
    console.error("Error fetching species:", error);
    throw error;
  }
};

export const deleteVoucher = async (accessToken, nid) => {
  try {
    const res = await axios.delete(`${apiUrlVoucher}/${nid}`, {
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

export const getCurrentVoucher = async (vid) => {
  try {
    const res = await axios.get(`${apiUrlVoucher}/${vid}`);
    return res.data.data;
  } catch (error) {
    console.error("Error fetching species:", error);
    return null;
  }
};
