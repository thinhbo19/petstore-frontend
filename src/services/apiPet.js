import axios from "axios";
import { apiUrlBreeds, apiUrlSpecies, apiUrlPets } from "./config";

export const getAllSpecies = async () => {
  try {
    const res = await axios.get(`${apiUrlSpecies}/getAllSpecies`);
    return res.data.petSpecie;
  } catch (error) {
    throw error;
  }
};
export const getAllBreeds = async () => {
  try {
    const res = await axios.get(`${apiUrlBreeds}/getAllBreed`);
    return res.data.petBreed;
  } catch (error) {
    throw error;
  }
};
export const getBreedBySpecies = async (species) => {
  try {
    const res = await axios.get(`${apiUrlBreeds}/getBreedBySpecies/${species}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const getAllDog = async () => {
  try {
    const res = await axios.get(`${apiUrlBreeds}/getBreedByNameSpecies/Dog`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const getAllCat = async () => {
  try {
    const res = await axios.get(`${apiUrlBreeds}/getBreedByNameSpecies/Cat`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const getPetByBreed = async (breed) => {
  try {
    const res = await axios.get(`${apiUrlPets}/getPetByBreed/${breed}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const getAllPets = async () => {
  try {
    const res = await axios.get(`${apiUrlPets}/allPets`);
    return res.data.pets;
  } catch (error) {
    throw error;
  }
};

export const getSimplePets = async () => {
  try {
    const pets = await getAllPets();
    const res = pets.map((pet) => ({
      _id: pet._id,
      rating: pet.rating,
    }));
    return res;
  } catch (error) {
    throw error;
  }
};

export const getCurrentPets = async (pid) => {
  try {
    const res = await axios.get(`${apiUrlPets}/current/${pid}`);
    return res.data.pet;
  } catch (error) {
    throw error;
  }
};

export const getCurrentPetsByName = async (name) => {
  try {
    const res = await axios.get(`${apiUrlPets}/currentPet/${name}`);
    return res.data;
  } catch (error) {
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
    throw error;
  }
};
