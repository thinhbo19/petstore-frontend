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
export const getBreedBySpecies = async (species) => {
  try {
    const res = await axios.get(`${apiUrlBreeds}/getBreedBySpecies/${species}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching breed:", error);
    throw error;
  }
};
export const getPetByBreed = async (breed) => {
  try {
    const res = await axios.get(`${apiUrlPets}/getPetByBreed/${breed}`);
    return res.data;
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
export const sortingBreed = async (namePath, sortType) => {
  try {
    const res = await axios.get(
      `${apiUrlBreeds}/sortBreed/${namePath}?sort=${sortType}`
    );
    return res.data;
  } catch (error) {
    console.error("Error sorting breeds:", error);
    throw error;
  }
};
export const sortingPets = async (namePath, sortType) => {
  try {
    const res = await axios.get(
      `${apiUrlPets}/sortPet/${namePath}?sort=${sortType}`
    );
    return res.data;
  } catch (error) {
    console.error("Error sorting breeds:", error);
    throw error;
  }
};

export const filterPetsByPrice = async (minPrice, maxPrice, breed) => {
  try {
    const response = await axios.get(`${apiUrlPets}/filterPrice/${breed}`, {
      params: { minPrice, maxPrice },
    });
    return response;
  } catch (error) {
    console.error("Failed to fetch pets by price:", error);
    throw error;
  }
};
