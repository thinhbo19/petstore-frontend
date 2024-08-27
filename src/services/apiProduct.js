import axios from "axios";
import { apiUrlBrand, apiUrlCategory, apiUrlProduct } from "./config";

export const getAllCategory = async (accessToken) => {
  try {
    const res = await axios.get(`${apiUrlCategory}/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data.category;
  } catch (error) {
    console.error("Error fetching species:", error);
    throw error;
  }
};

export const createCategory = async (accessToken, name) => {
  try {
    const res = await axios.post(
      `${apiUrlCategory}/addCate`,
      { nameCategory: name },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching species:", error);
    throw error;
  }
};

export const deleteCategory = async (accessToken, cateId) => {
  try {
    const res = await axios.delete(`${apiUrlCategory}/${cateId}`, {
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

export const changeCate = async (accessToken, cateId, nameCategory) => {
  try {
    const res = await axios.patch(
      `${apiUrlCategory}/${cateId}`,
      { nameCategory: nameCategory },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching species:", error);
    throw error;
  }
};

export const getAllBrand = async (accessToken) => {
  try {
    const res = await axios.get(`${apiUrlBrand}/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data.brands;
  } catch (error) {
    console.error("Error fetching species:", error);
    throw error;
  }
};

export const createBrand = async (accessToken, name, category) => {
  try {
    const res = await axios.post(
      `${apiUrlBrand}/addBrand`,
      { nameBrand: name, category: category },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching species:", error);
    throw error;
  }
};

export const changeBrand = async (accessToken, brandId, nameBrand) => {
  try {
    const res = await axios.patch(
      `${apiUrlBrand}/${brandId}`,
      { nameBrand: nameBrand },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching species:", error);
    throw error;
  }
};

export const deleteBrand = async (accessToken, brandId) => {
  try {
    const res = await axios.delete(`${apiUrlBrand}/${brandId}`, {
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

export const getAllProduct = async (accessToken) => {
  try {
    const res = await axios.get(`${apiUrlProduct}/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data.product;
  } catch (error) {
    console.error("Error fetching species:", error);
    throw error;
  }
};

export const getCurrentProduct = async (prodid) => {
  try {
    const res = await axios.get(`${apiUrlProduct}/current/${prodid}`);
    return res.data.existing;
  } catch (error) {
    console.error("Error fetching species:", error);
    throw error;
  }
};

export const createProduct = async (accessToken, formData) => {
  try {
    const res = await axios.post(`${apiUrlProduct}/addProduct`, formData, {
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

export const deleteProduct = async (accessToken, productId) => {
  try {
    const res = await axios.delete(`${apiUrlProduct}/${productId}`, {
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

export const changeProduct = async (accessToken, productId, formData) => {
  try {
    const res = await axios.put(`${apiUrlProduct}/${productId}`, formData, {
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
