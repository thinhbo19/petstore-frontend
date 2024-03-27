import axios from "axios";
import { apiUrlBreeds, apiUrlSpecies } from "./config";

export const getAllSpecies = async (accessToken) => {
  try {
    const res = await axios.get(`${apiUrlSpecies}/getAllSpecies`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data.petSpecie;
  } catch (error) {
    console.error("Error fetching species:", error);
    throw error;
  }
};
export const getAllBreeds = async (accessToken) => {
  try {
    const res = await axios.get(`${apiUrlBreeds}/getAllBreed`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data.petBreed;
  } catch (error) {
    console.error("Error fetching species:", error);
    throw error;
  }
};
