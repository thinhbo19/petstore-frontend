import axios from "axios";
import { apiUrlBreeds, apiUrlSpecies, apiUrlPets } from "./config";

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
export const getAllBreeds = async () => {
  try {
    const res = await axios.get(`${apiUrlBreeds}/getAllBreed`);
    return res.data.petBreed;
  } catch (error) {
    console.error("Error fetching breed:", error);
    throw error;
  }
};
export const getAllPets = async () => {
  try {
    const res = await axios.get(`${apiUrlPets}/allPets`);
    return res.data.pets;
  } catch (error) {
    console.error("Error fetching pets:", error);
    throw error;
  }
};
export const getCurrentPets = async (pid, accessToken) => {
  try {
    const res = await axios.get(`${apiUrlPets}/current/${pid}`, {
      // headers: {
      //   Authorization: `Bearer ${accessToken}`,
      // },
    });
    return res.data.pet;
  } catch (error) {
    console.error("Error fetching pets:", error);
    throw error;
  }
};
