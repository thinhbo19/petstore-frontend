import axios from "axios";
import { apiUrlNews } from "./config";

export const getAllNews = async () => {
  try {
    const res = await axios.get(`${apiUrlNews}/`);
    return res.data.news;
  } catch (error) {
    console.error("Error fetching species:", error);
    throw error;
  }
};

export const postNews = async (accessToken, formData) => {
  try {
    const res = await axios.post(`${apiUrlNews}/addNews`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data.news;
  } catch (error) {
    console.error("Error fetching species:", error);
    throw error;
  }
};

export const changeNews = async (accessToken, formData, nid) => {
  try {
    const res = await axios.put(`${apiUrlNews}/${nid}`, formData, {
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

export const deleteNews = async (accessToken, nid) => {
  try {
    const res = await axios.delete(`${apiUrlNews}/${nid}`, {
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

export const getCurrentNews = async (nid) => {
  try {
    const res = await axios.get(`${apiUrlNews}/${nid}`);
    return res.data.news;
  } catch (error) {
    console.error("Error fetching species:", error);
    throw error;
  }
};
