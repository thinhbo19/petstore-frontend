import axios from "axios";
import { apiUrlCategory, apiUrlProduct } from "./config";

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

export const getAllProduct = async () => {
  try {
    const res = await axios.get(`${apiUrlProduct}`);
    return res.data.product;
  } catch (error) {
    console.error("Error fetching species:", error);
    throw error;
  }
};

export const getSimpleProd = async () => {
  try {
    const prods = await getAllProduct();
    const res = prods.map((prod) => ({
      _id: prod._id,
      rating: prod.rating,
    }));
    return res;
  } catch (error) {
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

export const getProdOrPet = async (pid) => {
  try {
    const res = await axios.get(`${apiUrlProduct}/prodpets/${pid}`);
    return res.data.data;
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

export const getCurrentProdByName = async (name) => {
  try {
    const res = await axios.get(`${apiUrlProduct}/currentProduct/${name}`);
    return res.data.prod;
  } catch (error) {
    throw error;
  }
};

export const getProductByCate = async (nameCate) => {
  try {
    const res = await axios.get(`${apiUrlProduct}/category/${nameCate}`);
    return res.data.products;
  } catch (error) {
    throw error;
  }
};
