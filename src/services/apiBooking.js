import axios from "axios";
import { apiUrlService } from "./config";

export const getAllService = async () => {
  try {
    const res = await axios.get(`${apiUrlService}/`);
    return res.data.data;
  } catch (error) {
    console.error("Error fetching species:", error);
    throw error;
  }
};
